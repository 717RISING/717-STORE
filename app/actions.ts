'use server'

import { signIn, signOut } from "@/lib/auth-context" // Assuming signIn and signOut are exported from auth-context
import { addUser, User } from "@/lib/users" // Assuming addUser and User type are exported from lib/users
import { redirect } from "next/navigation"
import { sendEmail } from "@/lib/email" // Assuming sendEmail is exported from lib/email

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData))
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'Credenciales inválidas.'
    }
    throw error
  }
}

export async function registerUser(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) {
    return { message: 'Todos los campos son obligatorios.' }
  }

  // Basic email validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    return { message: 'Formato de email inválido.' }
  }

  // Password strength (example: min 6 characters)
  if (password.length < 6) {
    return { message: 'La contraseña debe tener al menos 6 caracteres.' }
  }

  try {
    // In a real application, you would hash the password before storing it
    const newUser: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'orderCount' | 'totalSpent' | 'isActive' | 'phone'> = {
      name,
      email,
      passwordHash: password, // This should be a hashed password
    }
    const addedUser = await addUser(newUser)

    if (addedUser) {
      // Optionally send a welcome email
      await sendEmail({
        to: email,
        subject: 'Bienvenido a 717 Store!',
        html: `<p>Hola ${name},</p><p>Gracias por registrarte en 717 Store. ¡Estamos emocionados de tenerte con nosotros!</p><p>Empieza a explorar nuestros productos <a href="${process.env.NEXT_PUBLIC_BASE_URL}/productos">aquí</a>.</p>`,
      })
      redirect('/login?registered=true')
    } else {
      return { message: 'Error al registrar el usuario. El email ya podría estar en uso.' }
    }
  } catch (error) {
    console.error('Error during registration:', error)
    return { message: 'Ocurrió un error inesperado durante el registro.' }
  }
}

export async function logout() {
  await signOut({ callbackUrl: '/' })
}
