// This is a mock database for demonstration purposes.
// In a real application, you would use a proper database like PostgreSQL, MongoDB, etc.

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  sizes: string[]
  colors: string[]
  stock: number
  rating: number
  reviews: number
}

export interface CartItem {
  productId: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  size?: string
  color?: string
}

export interface User {
  id: string
  email: string
  passwordHash: string
  name: string
  isAdmin: boolean
}

export interface Address {
  id: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "bank_transfer"
  details: string // e.g., last 4 digits of card, PayPal email
  isDefault: boolean
}

export interface ShippingInfo {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string // Added email to shipping info
  cost: number // Added cost to shipping info
}

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
  imageUrl: string
  size?: string
  color?: string
}

export interface Order {
  id: string
  userId?: string
  customerName?: string
  customerEmail: string // Added for sending confirmation emails
  items: OrderItem[]
  shippingInfo: ShippingInfo
  totalAmount: number
  orderDate: Date
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number // 1-5 stars
  comment: string
  createdAt: string // ISO string date
}

// Mock database for demonstration purposes
interface MockDB {
  products: Product[]
  users: User[]
  orders: Order[]
}

export const db: MockDB = {
  products: [
    {
      id: "1",
      name: 'Camiseta "Big Dreams"',
      description: 'Camiseta de algodón suave con estampado "Big Dreams". Ideal para el día a día.',
      price: 25000,
      imageUrl: "/products/camisetas/big-dreams-tshirt.jpg",
      category: "Camisetas",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Negro", "Blanco"],
      stock: 50,
      rating: 4.5,
      reviews: 120,
    },
    {
      id: "2",
      name: 'Oversized Tee "Urban"',
      description: "Camiseta oversized de estilo urbano, perfecta para un look relajado y moderno.",
      price: 30000,
      imageUrl: "/products/camisetas/oversized-tee.jpg",
      category: "Camisetas",
      sizes: ["M", "L", "XL"],
      colors: ["Gris", "Negro"],
      stock: 30,
      rating: 4.7,
      reviews: 85,
    },
    {
      id: "3",
      name: 'Graphic Tee "Blood"',
      description: 'Camiseta con gráfico impactante "Blood", para quienes buscan destacar.',
      price: 28000,
      imageUrl: "/products/camisetas/graphic-tee-blood.jpg",
      category: "Camisetas",
      sizes: ["S", "M", "L"],
      colors: ["Rojo", "Negro"],
      stock: 40,
      rating: 4.3,
      reviews: 95,
    },
    {
      id: "4",
      name: 'Graphic Tee "Pain"',
      description: 'Camiseta con diseño "Pain", que combina arte y comodidad.',
      price: 28000,
      imageUrl: "/products/camisetas/graphic-tee-pain.jpg",
      category: "Camisetas",
      sizes: ["M", "L", "XL"],
      colors: ["Blanco", "Negro"],
      stock: 35,
      rating: 4.6,
      reviews: 110,
    },
    // Add more products as needed
  ],
  users: [],
  orders: [],
}

// Function to initialize or reset the database (for development)
export function initializeDB() {
  db.users = []
  db.orders = []
  // You might want to reset product stock here if it's mutable
  console.log("Mock database initialized.")
}

// Mock user functions
export async function getUserFromDatabase(email: string): Promise<User | null> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100))
  return db.users.find((user) => user.email === email) || null
}

export async function saveUserToDatabase(user: User): Promise<boolean> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100))
  const index = db.users.findIndex((u) => u.id === user.id)
  if (index !== -1) {
    db.users[index] = user
  } else {
    db.users.push(user)
  }
  return true
}
