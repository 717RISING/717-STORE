import type { Order } from "./database"
import { sendCorporateOrderNotification, sendOrderConfirmationToCustomer } from "./email"

// Simulación de base de datos de pedidos
const orders: Order[] = []

export async function createOrder(orderData: Omit<Order, "id" | "createdAt">): Promise<Order> {
  const newOrder: Order = {
    id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    ...orderData,
  }
  orders.push(newOrder)

  // Enviar notificación al correo corporativo
  const corporateEmailSent = await sendCorporateOrderNotification(newOrder)
  if (!corporateEmailSent) {
    console.error("Error al enviar la notificación al correo corporativo.")
    // Aquí podrías implementar un sistema de reintento o alerta
  } else {
    console.log("Notificación de pedido enviada al correo corporativo.")
  }

  // Enviar confirmación al cliente
  const customerEmailSent = await sendOrderConfirmationToCustomer(newOrder)
  if (!customerEmailSent) {
    console.error("Error al enviar la confirmación al cliente.")
    // Aquí podrías implementar un sistema de reintento o alerta
  } else {
    console.log("Confirmación de pedido enviada al cliente.")
  }

  return newOrder
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return orders.find((order) => order.id === id)
}

export async function getAllOrders(): Promise<Order[]> {
  return orders
}

export async function updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
  const orderIndex = orders.findIndex((order) => order.id === id)
  if (orderIndex > -1) {
    orders[orderIndex].status = status
    return orders[orderIndex]
  }
  return undefined
}
