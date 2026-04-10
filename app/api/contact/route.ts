import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const projectType = formData.get("projectType") as string
    const message = formData.get("message") as string

    const files = formData.getAll("files") as File[]

    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        return {
          filename: file.name,
          content: buffer,
        }
      })
    )

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

        ${files.length > 0 ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #374151; margin-bottom: 10px;">Attached Files (${files.length})</h3>
          <ul style="list-style: none; padding: 0;">
            ${files.map(file => `
              <li style="padding: 5px 0;">
                📎 ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)
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

${files.length > 0 ? `
Attached Files (${files.length}):
${files.map(file => `- ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`).join('\n')}
` : ''}
    `

    const data = await resend.emails.send({
      from: "Ragsdale Contact Form <info@ragsdaledesign.com>",
      to: process.env.CONTACT_EMAIL || "info@ragsdaledesign.com",
      replyTo: email,
      subject: `New Project Inquiry from ${name}`,
      html: emailHtml,
      text: emailText,
      attachments: attachments.length > 0 ? attachments : undefined,
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
