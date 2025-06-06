import {
  saveOrderToDatabase,
  getOrderByIdFromDatabase,
  getUserOrdersFromDatabase,
  type DatabaseOrder,
} from "./database"
import { sendOrderConfirmationEmail, sendShippingNotificationEmail, sendDeliveryConfirmationEmail } from "./email"

export interface Order {
  id: string
  userId?: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    size: string
    image: string
  }>
  shipping: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billing: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  payment: {
    method: "card" | "paypal" | "transfer"
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    cardName?: string
  }
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  trackingNumber?: string
  emailsSent: {
    confirmation: boolean
    shipping: boolean
    delivery: boolean
  }
}

export async function createOrder(
  orderData: Omit<Order, "id" | "createdAt" | "status" | "emailsSent">,
): Promise<Order> {
  const order: Order = {
    ...orderData,
    id: `717${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    trackingNumber: `717TRK${Date.now().toString().slice(-6)}`,
    emailsSent: {
      confirmation: false,
      shipping: false,
      delivery: false,
    },
  }

  // Guardar en la base de datos
  const databaseOrder: DatabaseOrder = {
    ...order,
    customerEmail: order.shipping.email,
    customerName: `${order.shipping.firstName} ${order.shipping.lastName}`,
  }

  try {
    await saveOrderToDatabase(databaseOrder)

    // Enviar email de confirmación
    await sendOrderConfirmationEmail(order.shipping.email, order)
    order.emailsSent.confirmation = true

    console.log(`Order ${order.id} created and confirmation email sent`)
  } catch (error) {
    console.error("Error creating order:", error)
  }

  return order
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const databaseOrder = await getOrderByIdFromDatabase(id)
    if (databaseOrder) {
      // Convertir DatabaseOrder a Order
      const { customerEmail, customerName, ...order } = databaseOrder
      return order
    }
    return null
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}

export async function getUserOrders(userEmail: string): Promise<Order[]> {
  try {
    const databaseOrders = await getUserOrdersFromDatabase(userEmail)
    return databaseOrders.map(({ customerEmail, customerName, ...order }) => order)
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}

export async function updateOrderStatus(orderId: string, status: Order["status"]): Promise<Order | null> {
  try {
    const order = await getOrderById(orderId)
    if (order) {
      order.status = status

      // Enviar emails según el estado
      if (status === "shipped" && !order.emailsSent.shipping) {
        await sendShippingNotificationEmail(order.shipping.email, order)
        order.emailsSent.shipping = true
      } else if (status === "delivered" && !order.emailsSent.delivery) {
        await sendDeliveryConfirmationEmail(order.shipping.email, order)
        order.emailsSent.delivery = true
      }

      // Actualizar en la base de datos
      const databaseOrder: DatabaseOrder = {
        ...order,
        customerEmail: order.shipping.email,
        customerName: `${order.shipping.firstName} ${order.shipping.lastName}`,
      }

      await saveOrderToDatabase(databaseOrder)
      return order
    }
    return null
  } catch (error) {
    console.error("Error updating order status:", error)
    return null
  }
}

export function calculateOrderTotals(items: Order["items"]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return { subtotal, shipping, tax, total }
}
