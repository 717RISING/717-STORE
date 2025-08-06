// This script would typically run on a server or a background process
// to simulate real-time order status updates.
// For a client-side only demo, this is illustrative.

const orders = [
  { id: "ORD-001", status: "pending" },
  { id: "ORD-002", status: "processing" },
  { id: "ORD-003", status: "shipped" },
];

function updateOrderStatus(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    console.log(`Order ${orderId} updated to status: ${newStatus}`);
    // In a real application, you would update a database here
    // and potentially notify the user via webhooks or real-time channels.
  } else {
    console.log(`Order ${orderId} not found.`);
  }
}

// Simulate updates after some time
setTimeout(() => updateOrderStatus("ORD-001", "processing"), 5000);
setTimeout(() => updateOrderStatus("ORD-002", "shipped"), 10000);
setTimeout(() => updateOrderStatus("ORD-003", "delivered"), 15000);

console.log("Order update simulation started.");
