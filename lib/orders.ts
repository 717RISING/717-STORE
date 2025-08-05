import { db, type Order, type OrderItem, type ShippingInfo } from "./database"
import { sendCorporateOrderNotification, sendOrderConfirmationToCustomer } from "./email"

// Función para generar un ID único para el pedido
function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

// Función para crear un nuevo pedido
export async function createOrder(
  items: OrderItem[],
  shippingInfo: ShippingInfo,
  totalAmount: number,
  customerEmail: string,
): Promise<Order | null> {
  try {
    const newOrder: Order = {
      id: generateOrderId(),
      customerEmail: customerEmail,
      items: items,
      shippingInfo: shippingInfo,
      totalAmount: totalAmount,
      orderDate: new Date(),
      status: "pending", // O "processing" dependiendo del flujo de pago
      paymentStatus: "paid", // Asumimos que el pago ya se procesó
    }

    db.orders.push(newOrder) // Guardar en la base de datos mock

    // Enviar notificaciones por correo
    await sendCorporateOrderNotification(newOrder)
    await sendOrderConfirmationToCustomer(newOrder)

    console.log(`Pedido ${newOrder.id} creado y notificaciones enviadas.`)
    return newOrder
  } catch (error) {
    console.error("Error al crear el pedido:", error)
    return null
  }
}

// Función para obtener un pedido por su ID
export async function getOrderById(orderId: string): Promise<Order | null> {
  return db.orders.find((order) => order.id === orderId) || null
}

// Función para obtener todos los pedidos (para el panel de administración)
export async function getAllOrders(): Promise<Order[]> {
  return db.orders
}

// Función para actualizar el estado de un pedido
export async function updateOrderStatus(orderId: string, newStatus: Order["status"]): Promise<boolean> {
  const orderIndex = db.orders.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    db.orders[orderIndex].status = newStatus
    return true
  }
  return false
}
