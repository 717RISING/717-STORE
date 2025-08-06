// lib/orders.ts
// This file defines the structure for orders and provides mock data.

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
  size: string
  image: string
}

export interface Order {
  id: string
  userId: string // ID del usuario que realizó el pedido
  customerName: string
  customerEmail: string
  orderDate: string // ISO string
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "refunded"
  shippingAddress: {
    street: string
    city: string
    zip: string
    country: string
  }
  items: OrderItem[]
  channel?: string // e.g., "Web", "Mobile App", "In-store"
}

// Mock data for orders (can be empty initially or pre-populated)
const orders: Order[] = [
  {
    id: "ORD001",
    userId: "user_1",
    customerName: "Juan Pérez",
    customerEmail: "juan.perez@example.com",
    orderDate: new Date("2023-10-26T10:00:00Z").toISOString(),
    totalAmount: 170000,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: {
      street: "Calle Falsa 123",
      city: "Bogotá",
      zip: "110111",
      country: "Colombia",
    },
    items: [
      {
        productId: "camiseta-big-dreams",
        name: "Camiseta 'Big Dreams'",
        quantity: 1,
        price: 85000,
        size: "M",
        image: "/products/camisetas/big-dreams-tshirt.png",
      },
      {
        productId: "camiseta-oversized-tee",
        name: "Oversized Tee 'Street'",
        quantity: 1,
        price: 95000,
        size: "L",
        image: "/products/camisetas/oversized-tee.png",
      },
    ],
    channel: "Web",
  },
  {
    id: "ORD002",
    userId: "user_2",
    customerName: "María García",
    customerEmail: "maria.garcia@example.com",
    orderDate: new Date("2023-10-20T14:30:00Z").toISOString(),
    totalAmount: 89000,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: {
      street: "Avenida Siempre Viva 742",
      city: "Medellín",
      zip: "050010",
      country: "Colombia",
    },
    items: [
      {
        productId: "camiseta-graphic-blood",
        name: "Graphic Tee 'Blood'",
        quantity: 1,
        price: 89000,
        size: "S",
        image: "/products/camisetas/graphic-tee-blood.png",
      },
    ],
    channel: "Mobile App",
  },
  {
    id: "ORD003",
    userId: "user_1",
    customerName: "Juan Pérez",
    customerEmail: "juan.perez@example.com",
    orderDate: new Date("2023-11-01T09:00:00Z").toISOString(),
    totalAmount: 110000,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: {
      street: "Calle Falsa 123",
      city: "Bogotá",
      zip: "110111",
      country: "Colombia",
    },
    items: [
      {
        productId: "cargo-pants",
        name: "Cargo Pants",
        quantity: 1,
        price: 110000,
        size: "32",
        image: "/placeholder.svg?height=400&width=400&text=Cargo+Pants",
      },
    ],
    channel: "Web",
  },
]

// Simulate fetching orders from a database
export async function getOrders(): Promise<Order[]> {
  return new Promise((resolve) => setTimeout(() => resolve(orders), 500))
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return new Promise((resolve) => setTimeout(() => resolve(orders.find((o) => o.id === id)), 300))
}

export async function addOrder(newOrder: Order): Promise<Order> {
  return new Promise((resolve) => {
    orders.push(newOrder)
    console.log("Order added to mock DB:", newOrder)
    setTimeout(() => resolve(newOrder), 300)
  })
}

export async function updateOrderStatus(id: string, newStatus: Order["status"]): Promise<Order | undefined> {
  return new Promise((resolve) => {
    const orderIndex = orders.findIndex((o) => o.id === id)
    if (orderIndex > -1) {
      orders[orderIndex].status = newStatus
      console.log(`Order ${id} status updated to ${newStatus}`)
      resolve(orders[orderIndex])
    } else {
      resolve(undefined)
    }
  })
}

// This function is specifically for internal use by the database mock, not for direct external calls.
export async function _saveOrderToDatabase(order: Order): Promise<Order> {
  return new Promise((resolve) => {
    orders.push(order);
    resolve(order);
  });
}
