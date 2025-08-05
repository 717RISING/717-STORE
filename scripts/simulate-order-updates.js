// scripts/simulate-order-updates.js
// Este script simula actualizaciones de estado de pedidos en un entorno de desarrollo.
// No está diseñado para producción.

const { getAllOrders, updateOrderStatus, updateOrderPaymentStatus } = require("../lib/orders") // Asegúrate de que estas funciones estén exportadas

async function simulateOrderUpdates() {
  console.log("Iniciando simulación de actualizaciones de pedidos...")

  const orders = await getAllOrders()

  if (orders.length === 0) {
    console.log("No hay pedidos para simular actualizaciones.")
    return
  }

  for (const order of orders) {
    // Simular que algunos pedidos pasan a "shipped" después de un tiempo
    if (order.status === "processing" && Math.random() > 0.5) {
      await updateOrderStatus(order.id, "shipped")
      console.log(`Pedido ${order.id} actualizado a 'Enviado'.`)
    }

    // Simular que algunos pedidos "shipped" pasan a "delivered"
    if (order.status === "shipped" && Math.random() > 0.7) {
      await updateOrderStatus(order.id, "delivered")
      console.log(`Pedido ${order.id} actualizado a 'Entregado'.`)
    }

    // Simular un fallo de pago para un pedido pendiente (raro)
    if (order.paymentStatus === "pending" && Math.random() < 0.1) {
      await updateOrderPaymentStatus(order.id, "failed")
      await updateOrderStatus(order.id, "cancelled") // Cancelar si el pago falla
      console.log(`Pedido ${order.id} (pago pendiente) ha fallado y ha sido cancelado.`)
    }
  }

  console.log("Simulación de actualizaciones de pedidos finalizada.")
}

// Ejecutar la simulación cada 30 segundos en desarrollo
// if (process.env.NODE_ENV === 'development') {
//   setInterval(simulateOrderUpdates, 30000);
//   console.log('Simulación de actualizaciones de pedidos programada para ejecutarse cada 30 segundos.');
// }

// Para ejecutar una vez manualmente:
simulateOrderUpdates()
