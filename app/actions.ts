'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyUserCredentials, registerUser } from '@/lib/users'
import { addOrder } from '@/lib/database'

export async function handleLogin(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos' }
  }

  try {
    const user = await verifyUserCredentials(email, password)
    
    if (!user) {
      return { error: 'Credenciales inválidas' }
    }

    // Set user session cookie
    const cookieStore = cookies()
    cookieStore.set('user_session', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    // Redirect based on user role
    if (user.role === 'admin') {
      redirect('/admin')
    } else {
      redirect('/cuenta')
    }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Error interno del servidor' }
  }
}

export async function handleRegister(prevState: any, formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return { error: 'Todos los campos son requeridos' }
  }

  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' }
  }

  try {
    const user = await registerUser(firstName, lastName, email, password)
    
    if (!user) {
      return { error: 'El usuario ya existe' }
    }

    // Set user session cookie
    const cookieStore = cookies()
    cookieStore.set('user_session', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    redirect('/cuenta')
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Error interno del servidor' }
  }
}

export async function handleLogout() {
  const cookieStore = cookies()
  cookieStore.delete('user_session')
  redirect('/')
}

export async function createOrderAction(orderData: any) {
  try {
    const order = await addOrder({
      id: `ORD-${Date.now()}`,
      ...orderData,
      orderDate: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending'
    })
    
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error('Order creation error:', error)
    return { success: false, error: 'Error al crear el pedido' }
  }
}

export async function updateProfile(prevState: any, formData: FormData) {
  // Simulate profile update
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: true, message: 'Perfil actualizado correctamente' }
}

export async function changePassword(prevState: any, formData: FormData) {
  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: 'Todos los campos son requeridos' }
  }

  if (newPassword !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden' }
  }

  if (newPassword.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' }
  }

  // Simulate password change
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { success: true, message: 'Contraseña cambiada correctamente' }
}
