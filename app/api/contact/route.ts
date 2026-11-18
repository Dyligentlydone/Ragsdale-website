import { NextRequest, NextResponse } from "next/server"
import { HeadObjectCommand } from "@aws-sdk/client-s3"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"
import { getR2Client, R2_BUCKET } from "@/lib/r2"

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const formData = await request.formData()

    const sessionId = formData.get("sessionId") as string | null
    if (!sessionId) {
      return NextResponse.json(
        { error: "Submission session missing" },
        { status: 400 }
      )
    }

    const session = await prisma.uploadSession.findUnique({
      where: { id: sessionId },
      include: { uploads: true },
    })
    if (!session || session.consumed) {
      return NextResponse.json(
        { error: "Invalid or expired submission" },
        { status: 400 }
      )
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const projectType = formData.get("projectType") as string
    const message = formData.get("message") as string

    // Confirm each file actually landed in R2 before linking it
    const verifiedUploads = (
      await Promise.all(
        session.uploads.map(async (upload) => {
          try {
            const head = await getR2Client().send(
              new HeadObjectCommand({ Bucket: R2_BUCKET, Key: upload.key })
            )
            return { ...upload, size: head.ContentLength ?? upload.size }
          } catch {
            console.warn(`Upload ${upload.id} missing from storage, skipping`)
            return null
          }
        })
      )
    ).filter((u) => u !== null)

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin
    const fileLinks = verifiedUploads.map((u) => ({
      name: u.filename,
      size: u.size,
      url: `${origin}/api/files/${u.id}`,
    }))

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #111827; border-bottom: 2px solid #111827; padding-bottom: 10px;">
          New Project Inquiry - Ragsdale Design
        </h2>

        <div style="margin: 20px 0;">
          <h3 style="color: #374151; margin-bottom: 10px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            ` : ''}
            ${company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Company:</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            ` : ''}
            ${projectType ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Project Type:</td>
              <td style="padding: 8px 0;">${projectType}</td>
            </tr>
            ` : ''}
          </table>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #374151; margin-bottom: 10px;">Project Details</h3>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
${message}
          </div>
        </div>

        ${fileLinks.length > 0 ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #374151; margin-bottom: 10px;">Attached Files (${fileLinks.length})</h3>
          <ul style="list-style: none; padding: 0;">
            ${fileLinks.map(file => `
              <li style="padding: 5px 0;">
                📎 <a href="${file.url}" style="color: #2563eb;">${file.name}</a> (${(file.size / (1024 * 1024)).toFixed(2)} MB)
              </li>
            `).join('')}
          </ul>
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>This inquiry was submitted through the Ragsdale Design contact form.</p>
        </div>
      </div>
    `

    const emailText = `
New Project Inquiry - Ragsdale Design

Contact Information:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}
${projectType ? `Project Type: ${projectType}` : ''}

Project Details:
${message}

${fileLinks.length > 0 ? `
Attached Files (${fileLinks.length}):
${fileLinks.map(file => `- ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB): ${file.url}`).join('\n')}
` : ''}
    `

    const data = await resend.emails.send({
      from: "Ragsdale Contact Form <info@ragsdaledesign.com>",
      to: process.env.CONTACT_EMAIL || "info@ragsdaledesign.com",
      replyTo: email,
      subject: `New Project Inquiry from ${name}`,
      html: emailHtml,
      text: emailText,
    })

    await prisma.uploadSession.update({
      where: { id: sessionId },
      data: { consumed: true },
    })

    return NextResponse.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
