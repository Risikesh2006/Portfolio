import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const RECIPIENT_EMAIL = 'risisonu2006@gmail.com'

    // SMTP Configuration from environment variables
    const smtpConfigured =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS

    if (smtpConfigured) {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #eee;border-radius:10px;">
            <h2 style="color:#111;margin-top:0;">New Portfolio Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            <div style="margin-top:20px;padding:15px;background:#f9f9f9;border-radius:5px;white-space:pre-wrap;">${message}</div>
            <hr style="border:0;border-top:1px solid #eee;margin:20px 0;"/>
            <p style="font-size:12px;color:#999;">Sent from your portfolio contact form.</p>
          </div>
        `,
      })

      return NextResponse.json({ success: true, emailed: true })
    }

    // Fallback: No SMTP configured — log for local testing
    console.log('--- Contact Form Submission ---')
    console.log(`To: ${RECIPIENT_EMAIL}`)
    console.log(`From: ${name} (${email})`)
    console.log(`Message: ${message}`)
    console.log('-------------------------------')
    
    return NextResponse.json({ 
      success: true, 
      emailed: false,
      message: 'Email sending is not configured. Submission logged to server console.' 
    })
  } catch (err) {
    console.error('[Contact API Error]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
