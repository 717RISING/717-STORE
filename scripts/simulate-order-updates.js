// This script simulates real-time order updates for demonstration purposes.
// In a real application, these updates would come from a backend system
// triggered by events like payment confirmation, shipping updates, etc.

const orders = [
  { id: "ORD789012", status: "Pendiente", total: 120.00, userId: "user1" },
  { id: "ORD345678", status: "Procesando", total: 85.50, userId: "user2" },
  { id: "ORD901234", status: "Enviado", total: 200.00, userId: "user1" },
  { id: "ORD567890", status: "Entregado", total: 45.00, userId: "user3" },
];

function updateOrderStatus(orderId, newStatus) {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    console.log(`Order ${orderId} updated to status: ${newStatus}`);
    return orders[orderIndex];
  }
  console.log(`Order ${orderId} not found.`);
  return null;
}

function simulateUpdates() {
  console.log("Starting order update simulation...");

  // Simulate a pending order moving to processing
  setTimeout(() => {
    updateOrderStatus("ORD789012", "Procesando");
  }, 3000);

  // Simulate a processing order being shipped
  setTimeout(() => {
    updateOrderStatus("ORD345678", "Enviado");
  }, 7000);

  // Simulate a shipped order being delivered
  setTimeout(() => {
    updateOrderStatus("ORD901234", "Entregado");
  }, 12000);

  console.log("Simulation scheduled.");
}

// To run this simulation, you would typically call `simulateUpdates()`
// from a Node.js environment or integrate it into a testing framework.
// For a live application, this logic would reside on the server.

// Example of how to run it:
// simulateUpdates();
// console.log("Current orders:", orders); // This will show initial state, updates happen asynchronously.

// Export functions for potential external use or testing
export { orders, updateOrderStatus, simulateUpdates };
