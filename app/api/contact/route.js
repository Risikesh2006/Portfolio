import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const RECIPIENT_EMAIL = process.env.CONTACT_TO_EMAIL || 'risisonu2006@gmail.com'

    // SMTP Configuration from environment variables. Treat obvious
    // placeholder values (from .env.local.example) as "not configured"
    // so a half-filled-in env falls back to logging instead of a 500.
    const isPlaceholder = (v) => !v || v.startsWith('your-')
    const smtpConfigured =
      process.env.SMTP_HOST &&
      !isPlaceholder(process.env.SMTP_USER) &&
      !isPlaceholder(process.env.SMTP_PASS)

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

      const receivedAt = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })

      const escapeHtml = (str = '') =>
        str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

      const safeName = escapeHtml(name)
      const safeEmail = escapeHtml(email)
      const safeSubject = escapeHtml(subject || '')
      const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: `"${name}" <${email}>`,
        subject: subject ? `New inquiry: ${subject}` : `New portfolio message from ${name}`,
        text: [
          'NEW PORTFOLIO CONTACT FORM SUBMISSION',
          '',
          `Name:    ${name}`,
          `Email:   ${email}`,
          subject ? `Subject: ${subject}` : null,
          `Received: ${receivedAt}`,
          '',
          '--- Message ---',
          message,
        ]
          .filter(Boolean)
          .join('\n'),
        html: `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f1f1f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;">${safeName} sent you a message via your portfolio — ${safeSubject || 'no subject'}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f1f3;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e6e6e9;">
            <tr>
              <td style="background-color:#0C0C0C;padding:28px 32px;">
                <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8f9aa3;font-weight:600;">Portfolio Contact Form</p>
                <h1 style="margin:6px 0 0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">You've got a new message</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td style="padding:12px 16px;background-color:#f7f7f8;border-radius:10px 10px 0 0;border:1px solid #ececee;border-bottom:none;">
                      <p style="margin:0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a8f98;font-weight:600;">From</p>
                      <p style="margin:4px 0 0;font-size:15px;color:#111214;font-weight:600;">${safeName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background-color:#f7f7f8;border:1px solid #ececee;border-top:none;border-bottom:none;">
                      <p style="margin:0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a8f98;font-weight:600;">Email</p>
                      <p style="margin:4px 0 0;font-size:15px;">
                        <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;font-weight:600;">${safeEmail}</a>
                      </p>
                    </td>
                  </tr>
                  ${
                    safeSubject
                      ? `<tr>
                    <td style="padding:12px 16px;background-color:#f7f7f8;border-radius:0 0 10px 10px;border:1px solid #ececee;border-top:none;">
                      <p style="margin:0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a8f98;font-weight:600;">Subject</p>
                      <p style="margin:4px 0 0;font-size:15px;color:#111214;font-weight:600;">${safeSubject}</p>
                    </td>
                  </tr>`
                      : ''
                  }
                </table>

                <p style="margin:0 0 8px;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a8f98;font-weight:600;">Message</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:18px 20px;background-color:#fafafa;border-left:3px solid #0C0C0C;border-radius:8px;">
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#26282b;white-space:pre-wrap;">${safeMessage}</p>
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                  <tr>
                    <td>
                      <a href="mailto:${safeEmail}?subject=${encodeURIComponent(subject ? `Re: ${subject}` : 'Re: your message')}" style="display:inline-block;padding:12px 24px;background-color:#0C0C0C;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:999px;">Reply to ${safeName.split(' ')[0] || safeName}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background-color:#fafafa;border-top:1px solid #ececee;">
                <p style="margin:0;font-size:12px;color:#9a9fa6;">Received ${receivedAt} &middot; Sent from your portfolio's contact form. Reply directly to this email to respond to ${safeName.split(' ')[0] || safeName}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
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
    const authFailed = err?.responseCode === 535 || /invalid login|auth/i.test(err?.message || '')
    return NextResponse.json(
      {
        error: authFailed
          ? 'Email service rejected the SMTP credentials. Double-check SMTP_USER/SMTP_PASS in .env.local.'
          : 'Could not send the email right now. Please try again in a moment.',
      },
      { status: 500 }
    )
  }
}
