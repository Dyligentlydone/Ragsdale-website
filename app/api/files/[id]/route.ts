import { NextRequest, NextResponse } from "next/server"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { prisma } from "@/lib/prisma"
import { getR2Client, r2Configured, R2_BUCKET } from "@/lib/r2"

export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  if (!r2Configured()) {
    return NextResponse.json(
      { error: "File storage is not configured" },
      { status: 500 }
    )
  }

  const { id } = await ctx.params
  const upload = await prisma.upload.findUnique({ where: { id } })
  if (!upload) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  const disposition = `attachment; filename="${upload.filename.replace(/"/g, "_")}"`
  const url = await getSignedUrl(
    getR2Client(),
    new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: upload.key,
      ResponseContentDisposition: disposition,
      ResponseContentType: upload.mimeType,
    }),
    { expiresIn: 300 }
  )

  return NextResponse.redirect(url)
}
