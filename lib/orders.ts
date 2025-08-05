// lib/orders.ts
// Este archivo contendrá las funciones para interactuar con la "base de datos" de pedidos.
// La lógica de envío de correos se ha movido a las Server Actions.

import { db, type Order, type OrderItem, type ShippingInfo } from "./database"

// Función para generar un ID único para el pedido
function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

// Función para guardar un nuevo pedido en la "base de datos"
// Esta función es interna y no envía correos directamente.
export async function _saveOrderToDatabase(
  items: OrderItem[],
  shippingInfo: ShippingInfo,
  totalAmount: number,
  customerEmail: string,
): Promise<Order> {
  const newOrder: Order = {
    id: generateOrderId(),
    customerEmail: customerEmail,
    items: items,
    shippingInfo: shippingInfo,
    totalAmount: totalAmount,
    orderDate: new Date(),
    status: "pending", // Estado inicial
    paymentStatus: "paid", // Asumimos que el pago ya se procesó antes de llamar a esta función
  }

  db.orders.push(newOrder)
  console.log(`Pedido ${newOrder.id} guardado en la base de datos mock.`)
  return newOrder
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
    console.log(`Estado del pedido ${orderId} actualizado a ${newStatus}.`)
    return true
  }
  return false
}

// Función para actualizar el estado de pago de un pedido
export async function updateOrderPaymentStatus(
  orderId: string,
  newPaymentStatus: Order["paymentStatus"],
): Promise<boolean> {
  const orderIndex = db.orders.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    db.orders[orderIndex].paymentStatus = newPaymentStatus
    console.log(`Estado de pago del pedido ${orderId} actualizado a ${newPaymentStatus}.`)
    return true
  }
  return false
}
