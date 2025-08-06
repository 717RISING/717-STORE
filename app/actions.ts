"use server"

import { redirect } from "next/navigation"
import { verifyUserCredentials, registerUser } from "@/lib/users"
import { addOrder } from "@/lib/database" // Assuming addOrder is in lib/database
import { sendOrderConfirmationToCustomer, sendCorporateOrderNotification } from "@/lib/email" // Assuming these functions exist
import { cookies } from "next/headers"

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email y contraseña son requeridos." }
  }

  const user = await verifyUserCredentials(email, password)

  if (user) {
    // In a real app, you'd set a secure session cookie or JWT
    cookies().set("user_session", JSON.stringify({ id: user.id, email: user.email, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
    redirect("/cuenta")
  } else {
    return { error: "Credenciales inválidas." }
  }
}

export async function handleRegister(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!firstName || !lastName || !email || !password) {
    return { error: "Todos los campos son requeridos." }
  }

  try {
    const newUser = await registerUser(firstName, lastName, email, password)
    if (newUser) {
      // Auto-login after registration
      cookies().set("user_session", JSON.stringify({ id: newUser.id, email: newUser.email, role: newUser.role }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })
      redirect("/cuenta")
    } else {
      return { error: "El correo electrónico ya está registrado." }
    }
  } catch (error: any) {
    return { error: error.message || "Error al registrar usuario." }
  }
}

export async function handleLogout() {
  cookies().delete("user_session")
  redirect("/login")
}

export async function submitOrder(formData: FormData) {
  const customerEmail = formData.get("email") as string
  const customerName = formData.get("name") as string
  const address = formData.get("address") as string
  const city = formData.get("city") as string
  const zip = formData.get("zip") as string
  const country = formData.get("country") as string
  const paymentMethod = formData.get("paymentMethod") as string
  const cartItemsString = formData.get("cartItems") as string // Assuming cart items are passed as a JSON string

  if (!customerEmail || !customerName || !address || !city || !zip || !country || !paymentMethod || !cartItemsString) {
    return { success: false, message: "Faltan datos del pedido." }
  }

  let cartItems
  try {
    cartItems = JSON.parse(cartItemsString)
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("No hay artículos en el carrito.")
    }
  } catch (error) {
    console.error("Error parsing cart items:", error)
    return { success: false, message: "Datos del carrito inválidos." }
  }

  const totalAmount = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

  const newOrder = {
    id: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    userId: "guest_user", // Replace with actual user ID if authenticated
    customerName,
    customerEmail,
    orderDate: new Date().toISOString(),
    totalAmount,
    status: "pending", // Initial status
    paymentStatus: paymentMethod === "credit-card" ? "paid" : "pending", // Simplified payment status
    shippingAddress: { street: address, city, zip, country },
    items: cartItems.map((item: any) => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      image: item.image,
    })),
    channel: "Web", // Or derive from context
  }

  try {
    const savedOrder = await addOrder(newOrder) // Use addOrder from lib/database
    console.log("Order saved:", savedOrder)

    // Simulate sending emails
    await sendOrderConfirmationToCustomer(savedOrder)
    await sendCorporateOrderNotification(savedOrder)

    return { success: true, message: "Pedido realizado con éxito.", orderId: savedOrder.id }
  } catch (error) {
    console.error("Error submitting order:", error)
    return { success: false, message: "Error al procesar el pedido." }
  }
}
