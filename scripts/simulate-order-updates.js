// This script simulates real-time order updates.
// In a real application, this would be handled by a backend service
// pushing updates to a database or a message queue.

// This is a client-side simulation for demonstration purposes.
// It's not meant for production use.

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"]

function getRandomStatus() {
  return ORDER_STATUSES[Math.floor(Math.random() * ORDER_STATUSES.length)]
}

function simulateOrderUpdate(orderId) {
  const newStatus = getRandomStatus()
  console.log(`Simulating update for order ${orderId}: new status is ${newStatus}`)
  // In a real app, you'd update a database here
  // For now, we just log it.
}

// Simulate updates for a few mock orders every 10 seconds
const mockOrderIds = ["ORD-001", "ORD-002", "ORD-003", "ORD-004"]

setInterval(() => {
  mockOrderIds.forEach((orderId) => {
    simulateOrderUpdate(orderId)
  })
}, 10000)

console.log("Order update simulation started...")
