"use server"

import { _saveOrderToDatabase } from "@/lib/orders"
import { sendCorporateOrderNotification, sendOrderConfirmationToCustomer } from "@/lib/email"
import type { CartItem, ShippingInfo, PaymentInfo, OrderItem } from "@/lib/database"

interface CreateOrderResult {
  success: boolean
  orderId?: string
  error?: string
}

export async function createOrderAction(
  cartItems: CartItem[],
  shippingInfo: ShippingInfo,
  paymentInfo: PaymentInfo,
  totalAmount: number,
  customerName?: string,
): Promise<CreateOrderResult> {
  try {
    // Convertir CartItem a OrderItem para la base de datos
    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      imageUrl: item.imageUrl,
      size: item.size,
      color: item.color,
    }))

    // Guardar el pedido en la base de datos mock
    const newOrder = await _saveOrderToDatabase(
      orderItems,
      shippingInfo,
      totalAmount,
      shippingInfo.email, // Usar el email de envío como email del cliente
      customerName,
    )

    if (!newOrder) {
      return { success: false, error: "Error al guardar el pedido en la base de datos." }
    }

    // Enviar notificaciones por correo
    const corporateEmailSent = await sendCorporateOrderNotification(newOrder)
    const customerEmailSent = await sendOrderConfirmationToCustomer(newOrder)

    if (!corporateEmailSent || !customerEmailSent) {
      console.warn(`Advertencia: No se pudieron enviar todos los correos para el pedido ${newOrder.id}.`)
      // Podrías añadir lógica para reintentar o registrar el fallo del correo
    }

    return { success: true, orderId: newOrder.id }
  } catch (error) {
    console.error("Error en createOrderAction:", error)
    return { success: false, error: "Error interno del servidor al procesar el pedido." }
  }
}
