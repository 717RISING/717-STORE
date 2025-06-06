// Script para simular actualizaciones de pedidos y envío de emails
import { getAllOrders, updateOrderStatus, markEmailSent } from "../lib/orders.js"
import { sendShippingNotification, sendDeliveryNotification } from "../lib/email.js"

async function simulateOrderUpdates() {
  console.log("🚀 Iniciando simulación de actualizaciones de pedidos...")

  const orders = getAllOrders()
  console.log(`📦 Encontrados ${orders.length} pedidos`)

  for (const order of orders) {
    console.log(`\n📋 Procesando pedido ${order.id} (Estado: ${order.status})`)

    // Simular progresión de estados
    if (order.status === "pending") {
      // Cambiar a processing después de 2 segundos
      setTimeout(async () => {
        updateOrderStatus(order.id, "processing")
        console.log(`✅ Pedido ${order.id} cambiado a 'processing'`)
      }, 2000)

      // Cambiar a shipped después de 5 segundos y enviar email
      setTimeout(async () => {
        updateOrderStatus(order.id, "shipped")
        console.log(`🚚 Pedido ${order.id} cambiado a 'shipped'`)

        if (!order.emailsSent.shipping) {
          try {
            const emailSent = await sendShippingNotification(order)
            if (emailSent) {
              markEmailSent(order.id, "shipping")
              console.log(`📧 Email de envío enviado para pedido ${order.id}`)
            }
          } catch (error) {
            console.error(`❌ Error enviando email de envío: ${error.message}`)
          }
        }
      }, 5000)

      // Cambiar a delivered después de 8 segundos y enviar email
      setTimeout(async () => {
        updateOrderStatus(order.id, "delivered")
        console.log(`✅ Pedido ${order.id} cambiado a 'delivered'`)

        if (!order.emailsSent.delivery) {
          try {
            const emailSent = await sendDeliveryNotification(order)
            if (emailSent) {
              markEmailSent(order.id, "delivery")
              console.log(`📧 Email de entrega enviado para pedido ${order.id}`)
            }
          } catch (error) {
            console.error(`❌ Error enviando email de entrega: ${error.message}`)
          }
        }
      }, 8000)
    }
  }

  console.log("\n🎉 Simulación completada. Los pedidos se actualizarán automáticamente.")
}

// Ejecutar la simulación
simulateOrderUpdates()
