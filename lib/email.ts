import { Resend } from 'resend'
import { render } from '@react-email/render'
import WelcomeEmail from '@/emails/welcome-email' // Import the WelcomeEmail component

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  from?: string; // Optional: sender email, defaults to a generic one if not provided
}

export async function sendEmail({ to, subject, html, text, from }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: from || '717 Store <onboarding@resend.dev>', // Default sender
      to: to,
      subject: subject,
      html: html,
      text: text,
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, message: error.message }
    }

    console.log('Email sent successfully:', data)
    return { success: true, message: 'Email sent successfully.' }
  } catch (error: any) {
    console.error('Unexpected error sending email:', error)
    return { success: false, message: error.message || 'An unexpected error occurred.' }
  }
}

export async function sendWelcomeEmail(toEmail: string, userName: string) {
  try {
    const emailHtml = render(WelcomeEmail({ userName }))

    const { data, error } = await resend.emails.send({
      from: '717 Store <onboarding@resend.dev>',
      to: toEmail,
      subject: '¡Bienvenido a 717 Store!',
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending welcome email:', error)
      return { success: false, message: error.message }
    }

    console.log('Welcome email sent successfully:', data)
    return { success: true, message: 'Welcome email sent successfully.' }
  } catch (error: any) {
    console.error('Unexpected error sending welcome email:', error)
    return { success: false, message: error.message || 'An unexpected error occurred.' }
  }
}
