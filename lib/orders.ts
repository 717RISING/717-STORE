export interface Order {
  id: string
  userId?: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    size: string
    image: string
  }>
  shipping: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billing: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  payment: {
    method: "card" | "paypal" | "transfer"
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    cardName?: string
  }
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  trackingNumber?: string
}

// Simulación de base de datos de pedidos
const orders: Order[] = []

export function createOrder(orderData: Omit<Order, "id" | "createdAt" | "status">): Order {
  const order: Order = {
    ...orderData,
    id: `717${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    trackingNumber: `717TRK${Date.now().toString().slice(-6)}`,
  }

  orders.push(order)
  return order
}

export function getOrderById(id: string): Order | null {
  return orders.find((order) => order.id === id) || null
}

export function getUserOrders(userId: string): Order[] {
  return orders.filter((order) => order.userId === userId)
}

export function calculateOrderTotals(items: Order["items"]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return { subtotal, shipping, tax, total }
}
