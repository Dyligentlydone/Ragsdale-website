import { NextRequest, NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import { prisma } from "@/lib/prisma"
import { getR2Client, r2Configured, R2_BUCKET } from "@/lib/r2"
import { getClientIp, verifyTurnstile } from "@/lib/turnstile"

const MAX_FILES = 20
const MAX_FILE_SIZE = 2_000_000_000 // 2GB, stays within Postgres Int
const ALLOWED_EXTENSIONS = new Set([
  "pdf", "ai", "eps", "psd", "indd",
  "png", "jpg", "jpeg", "gif", "svg", "webp", "zip",
])

interface FileSpec {
  name: string
  size: number
  type: string
}

export async function POST(request: NextRequest) {
  if (!r2Configured()) {
    return NextResponse.json(
      { error: "File storage is not configured" },
      { status: 500 }
    )
  }

  let body: { turnstileToken?: string; files?: FileSpec[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (!body.turnstileToken) {
    return NextResponse.json(
      { error: "Verification token missing" },
      { status: 400 }
    )
  }

  const turnstile = await verifyTurnstile(
    body.turnstileToken,
    getClientIp(request)
  )
  if (!turnstile.success) {
    console.warn("Turnstile verification failed", turnstile.errorCodes)
    return NextResponse.json({ error: "Verification failed" }, { status: 400 })
  }

  const files = body.files ?? []
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Too many files (max ${MAX_FILES})` },
      { status: 400 }
    )
  }

  for (const file of files) {
    const ext = file.name?.split(".").pop()?.toLowerCase() ?? ""
    if (!file.name || !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type not allowed: ${file.name || "unknown"}` },
        { status: 400 }
      )
    }
    if (!Number.isFinite(file.size) || file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large: ${file.name} (max 2GB)` },
        { status: 400 }
      )
    }
  }

  const sessionId = randomUUID()
  await prisma.uploadSession.create({
    data: { id: sessionId },
  })
  const client = getR2Client()

  const uploads = await Promise.all(
    files.map(async (file) => {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      const upload = await prisma.upload.create({
        data: {
          key: `uploads/${sessionId}/${randomUUID()}-${safeName}`,
          filename: file.name,
          size: Math.round(file.size),
          mimeType: file.type || "application/octet-stream",
          sessionId,
        },
      })

      const url = await getSignedUrl(
        client,
        new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: upload.key,
          ContentType: upload.mimeType,
        }),
        { expiresIn: 3600 }
      )

      return { id: upload.id, url, contentType: upload.mimeType }
    })
  )

  return NextResponse.json({ sessionId, uploads })
}
