'use server'

import { z } from 'zod'
import { getUserByEmail, createUser, createOrder as dbCreateOrder, updateOrderStatus as dbUpdateOrderStatus } from '@/lib/database'
import { ServerActionResponse, User, CartItem, ShippingAddress, OrderItem, Order } from '@/lib/types'
import { cookies } from 'next/headers'
import { sendEmail, sendWelcomeEmail } from '@/lib/email' // Ensure sendEmail and sendWelcomeEmail are imported
import { redirect } from 'next/navigation'

// Define Zod schemas for validation
const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
})

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Correo electrónico inválido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
})

const contactFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  email: z.string().email("Correo electrónico inválido."),
  subject: z.string().min(1, "El asunto es requerido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function handleLogin(
  prevState: ServerActionResponse | undefined,
  formData: FormData
): Promise<ServerActionResponse<User>> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validation = loginSchema.safeParse({ email, password })

  if (!validation.success) {
    return {
      success: false,
      error: "Error de validación.",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  const user = await getUserByEmail(email)

  if (!user || user.passwordHash !== password) { // In a real app, compare hashed passwords
    return { success: false, message: "Credenciales inválidas." }
  }

  // Set session cookie
  cookies().set('user_session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  return { success: true, message: "Inicio de sesión exitoso.", data: user }
}

export async function handleRegister(
  prevState: ServerActionResponse | undefined,
  formData: FormData
): Promise<ServerActionResponse<User>> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const validation = registerSchema.safeParse({ name, email, password, confirmPassword })

  if (!validation.success) {
    return {
      success: false,
      error: "Error de validación.",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { success: false, message: "Este correo electrónico ya está registrado." }
  }

  const newUser: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'orderCount' | 'totalSpent' | 'isActive'> = {
    name,
    email,
    passwordHash: password, // In a real app, hash this password
    isAdmin: false, // Default to regular user
  }

  const createdUser = await createUser(newUser)

  if (createdUser) {
    // Send welcome email
    await sendWelcomeEmail(createdUser.email, createdUser.name || 'Usuario')

    // Set session cookie
    cookies().set('user_session', JSON.stringify(createdUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    return { success: true, message: "Registro exitoso. ¡Bienvenido!", data: createdUser }
  } else {
    return { success: false, message: "Error al registrar el usuario." }
  }
}

export async function validateUserSession(): Promise<ServerActionResponse<User>> {
  const sessionCookie = cookies().get('user_session')
  if (sessionCookie) {
    try {
      const user = JSON.parse(sessionCookie.value) as User
      // In a real app, you might want to re-validate the user against your DB
      // or check JWT expiry. For this dummy, we trust the cookie content.
      return { success: true, data: user }
    } catch (error) {
      console.error("Error parsing user session cookie:", error)
      cookies().delete('user_session') // Clear invalid cookie
      return { success: false, message: "Sesión inválida." }
    }
  }
  return { success: false, message: "No hay sesión activa." }
}

export async function handleLogout(): Promise<ServerActionResponse> {
  cookies().delete('user_session')
  // Optionally call a backend logout endpoint if needed
  return { success: true, message: "Sesión cerrada exitosamente." }
}

export async function submitContactForm(
  prevState: ServerActionResponse | undefined,
  formData: FormData
): Promise<ServerActionResponse> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  const validation = contactFormSchema.safeParse({ name, email, subject, message });

  if (!validation.success) {
    return {
      success: false,
      error: "Error de validación en el formulario de contacto.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const emailContent = `
      <h1>Nuevo Mensaje de Contacto</h1>
      <p><strong>De:</strong> ${name} (${email})</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `;
    const emailResult = await sendEmail({
      to: 'info@717store.com', // Your contact email
      subject: `[Contacto 717 Store] ${subject}`,
      html: emailContent,
      from: email // Set sender to user's email for replies
    });

    if (emailResult.success) {
      return { success: true, message: "Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto." };
    } else {
      return { success: false, message: emailResult.message || "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde." };
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Error interno del servidor al procesar tu mensaje." };
  }
}

export async function createOrderAction(
  userId: string,
  cartItems: CartItem[],
  shippingAddress: ShippingAddress,
  totalAmount: number
): Promise<ServerActionResponse<Order>> {
  try {
    const orderItems: OrderItem[] = cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
      size: item.selectedSize,
      color: item.selectedColor,
    }));

    const newOrderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
      userId,
      items: orderItems,
      total: totalAmount,
      status: 'Pendiente',
      shippingAddress,
      paymentMethod: 'Tarjeta de Crédito', // Simplified for mock
    };

    const createdOrder = await dbCreateOrder(newOrderData);

    if (createdOrder) {
      return { success: true, message: 'Pedido creado exitosamente.', data: createdOrder };
    } else {
      return { success: false, message: 'Error al crear el pedido.' };
    }
  } catch (error: any) {
    console.error('Error in createOrderAction:', error);
    return { success: false, message: error.message || 'Error interno del servidor al crear el pedido.' };
  }
}

export async function updateOrderStatusAction(
  orderId: string,
  newStatus: Order['status']
): Promise<ServerActionResponse<Order>> {
  try {
    const updatedOrder = await dbUpdateOrderStatus(orderId, newStatus);
    if (updatedOrder) {
      return { success: true, message: 'Estado del pedido actualizado.', data: updatedOrder };
    } else {
      return { success: false, message: 'Pedido no encontrado o no se pudo actualizar.' };
    }
  } catch (error: any) {
    console.error('Error in updateOrderStatusAction:', error);
    return { success: false, message: error.message || 'Error interno del servidor al actualizar el estado del pedido.' };
  }
}
