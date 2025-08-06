import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Mock data for development
const mockProducts = [
  {
    id: "1",
    name: "Camiseta Big Dreams",
    description: "Camiseta de algodón premium con diseño exclusivo",
    price: 89000,
    image: "/products/camisetas/big-dreams-tshirt.jpg",
    category: "camisetas",
    stock: 15
  },
  {
    id: "2", 
    name: "Oversized Tee",
    description: "Camiseta oversized cómoda y moderna",
    price: 95000,
    image: "/products/camisetas/oversized-tee.jpg",
    category: "camisetas",
    stock: 8
  }
]

const mockOrders = [
  {
    id: "ORD-001",
    userId: "user1",
    customerName: "Juan Pérez",
    customerEmail: "juan@email.com",
    orderDate: "2024-01-15",
    totalAmount: 89000,
    status: "pending" as const,
    paymentStatus: "paid" as const,
    shippingAddress: {
      street: "Calle 123 #45-67",
      city: "Bogotá",
      zip: "110111",
      country: "Colombia"
    },
    items: [
      {
        productId: "1",
        name: "Camiseta Big Dreams",
        quantity: 1,
        price: 89000,
        size: "M"
      }
    ]
  }
]

const mockUsers = [
  {
    id: "user1",
    email: "juan@email.com",
    role: "customer" as const,
    name: "Juan Pérez",
    createdAt: "2024-01-01"
  },
  {
    id: "admin1",
    email: "admin@717store.com",
    role: "admin" as const,
    name: "Admin",
    createdAt: "2024-01-01"
  }
]

export async function getProducts() {
  return mockProducts
}

export async function addProduct(product: any) {
  mockProducts.push(product)
  return product
}

export async function updateProduct(product: any) {
  const index = mockProducts.findIndex(p => p.id === product.id)
  if (index !== -1) {
    mockProducts[index] = product
  }
  return product
}

export async function deleteProduct(id: string) {
  const index = mockProducts.findIndex(p => p.id === id)
  if (index !== -1) {
    mockProducts.splice(index, 1)
  }
  return true
}

export async function getOrders() {
  return mockOrders
}

export async function updateOrderStatus(orderId: string, status: string) {
  const order = mockOrders.find(o => o.id === orderId)
  if (order) {
    order.status = status as any
  }
  return order
}

export async function getUsers() {
  return mockUsers
}

export async function updateUserRole(userId: string, role: string) {
  const user = mockUsers.find(u => u.id === userId)
  if (user) {
    user.role = role as any
  }
  return user
}

export async function deleteUser(userId: string) {
  const index = mockUsers.findIndex(u => u.id === userId)
  if (index !== -1) {
    mockUsers.splice(index, 1)
  }
  return true
}
