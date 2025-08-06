// This script simulates real-time order updates.
// In a real application, this would be handled by a backend service
// pushing updates to a WebSocket or similar.

const orders = [
  { id: 'ORD001', status: 'Pendiente' },
  { id: 'ORD002', status: 'Completado' },
  { id: 'ORD003', status: 'Pendiente' },
];

function updateOrderStatus(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    console.log(`Order ${orderId} updated to: ${newStatus}`);
    return true;
  }
  console.log(`Order ${orderId} not found.`);
  return false;
}

function simulateUpdates() {
  console.log('Starting order update simulation...');

  // Simulate a few updates over time
  setTimeout(() => {
    updateOrderStatus('ORD001', 'Enviado');
  }, 3000); // After 3 seconds

  setTimeout(() => {
    updateOrderStatus('ORD003', 'Completado');
  }, 7000); // After 7 seconds

  setTimeout(() => {
    updateOrderStatus('ORD002', 'Entregado'); // New status
  }, 10000); // After 10 seconds

  console.log('Simulation scheduled.');
}

// To run this script:
// 1. Make sure you have Node.js installed.
// 2. Save this file as simulate-order-updates.js
// 3. Run in your terminal: node simulate-order-updates.js

// You can also integrate this into a larger Node.js backend
// or a serverless function that triggers these updates.

simulateUpdates();
