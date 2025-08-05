"use server"

import { _saveOrderToDatabase, type OrderItem, type ShippingInfo } from "@/lib/orders"
import { sendCorporateOrderNotification, sendOrderConfirmationToCustomer } from "@/lib/email"
import type { Order } from "@/lib/database"

export async function createOrderAction(
  items: OrderItem[],
  shippingInfo: ShippingInfo,
  totalAmount: number,
  customerEmail: string,
): Promise<Order | null> {
  try {
    // 1. Guardar el pedido en la "base de datos"
    const newOrder = await _saveOrderToDatabase(items, shippingInfo, totalAmount, customerEmail)

    // 2. Enviar notificaciones por correo (ahora que el pedido está guardado)
    await sendCorporateOrderNotification(newOrder)
    await sendOrderConfirmationToCustomer(newOrder)

    console.log(`Server Action: Pedido ${newOrder.id} procesado y correos enviados.`)
    return newOrder
  } catch (error) {
    console.error("Server Action: Error al procesar el pedido:", error)
    // Aquí podrías manejar errores más específicos, como revertir el estado del pago
    // o registrar el error para una revisión manual.
    return null
  }
}
