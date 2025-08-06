// This script simulates real-time order status updates.
// In a production environment, this would be handled by webhooks or a dedicated backend service.

const orders = [
  { id: "ORD001", status: "Pendiente" },
  { id: "ORD002", status: "Pendiente" },
  { id: "ORD003", status: "Pendiente" },
];

function updateOrderStatus(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    console.log(`Order ${orderId} updated to: ${newStatus}`);
  } else {
    console.log(`Order ${orderId} not found.`);
  }
}

console.log("Simulating order updates...");

// Simulate status changes over time
setTimeout(() => updateOrderStatus("ORD001", "Procesando"), 2000);
setTimeout(() => updateOrderStatus("ORD002", "Enviado"), 5000);
setTimeout(() => updateOrderStatus("ORD003", "Cancelado"), 7000);
setTimeout(() => updateOrderStatus("ORD001", "Enviado"), 9000);
setTimeout(() => updateOrderStatus("ORD001", "Entregado"), 12000);

console.log("Simulation started. Check logs for updates.");
