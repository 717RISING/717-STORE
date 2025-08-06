"use server"

import { Resend } from 'resend'
import { EmailTemplate } from '@/components/email-template' // Assuming you have this component
import { sendEmail } from '@/lib/email' // Assuming this function exists

const resend = new Resend(process.env.RESEND_API_KEY) // Ensure RESEND_API_KEY is set in your environment variables

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Simulate a delay for API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Send email using Resend (or your preferred email service)
    // For demonstration, we'll use the mock sendEmail function
    const { success, error } = await sendEmail({
      from: 'onboarding@resend.dev', // Replace with your verified sender email
      to: 'delivered@resend.dev', // Replace with your recipient email
      subject: `Nuevo mensaje de contacto: ${formData.subject}`,
      react: EmailTemplate({
        userName: formData.name,
        userEmail: formData.email,
        message: formData.message,
        subject: formData.subject,
      }),
    })

    if (success) {
      return { success: true, message: "Mensaje enviado exitosamente." }
    } else {
      console.error("Error sending email:", error)
      return { success: false, error: error || "Error al enviar el email." }
    }

  } catch (error) {
    console.error("Error in submitContactForm:", error)
    return { success: false, error: "Ocurrió un error inesperado en el servidor." }
  }
}

// Example of a server action for product search (can be expanded)
export async function searchProducts(query: string) {
  // In a real app, you'd query your database
  console.log(`Searching for products with query: ${query}`)
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate delay
  return { success: true, results: [] } // Return mock results
}

// Example of a server action for user login (can be expanded)
export async function loginUser(credentials: { email: string; password: string }) {
  console.log(`Attempting login for: ${credentials.email}`)
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate delay

  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    return { success: true, message: 'Login successful!', user: { id: '123', name: 'Test User', email: 'test@example.com', role: 'customer' } }
  } else if (credentials.email === 'admin@717store.com' && credentials.password === 'adminpassword') {
    return { success: true, message: 'Admin login successful!', user: { id: 'admin1', name: 'Admin User', email: 'admin@717store.com', role: 'admin' } }
  } else {
    return { success: false, error: 'Invalid credentials.' }
  }
}

// Example of a server action for user registration (can be expanded)
export async function registerUser(userData: { name: string; email: string; password: string }) {
  console.log(`Attempting registration for: ${userData.email}`)
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate delay

  // In a real app, you'd hash the password and save to DB
  if (userData.email.includes('@')) {
    return { success: true, message: 'Registration successful!', user: { id: 'newuser', name: userData.name, email: userData.email, role: 'customer' } }
  } else {
    return { success: false, error: 'Invalid email format.' }
  }
}

// Example of a server action for updating user profile
export async function updateProfile(userId: string, updates: { name?: string; email?: string }) {
  console.log(`Updating profile for user ${userId} with:`, updates)
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay

  // In a real app, you'd update the user in your database
  return { success: true, message: 'Profile updated successfully!' }
}
