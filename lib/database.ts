// lib/database.ts
// Este archivo simula una base de datos en memoria para el proyecto.
// En una aplicación real, esto se reemplazaría con una base de datos persistente (PostgreSQL, MongoDB, etc.).

// Interfaces para los tipos de datos
export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  sizes: string[]
  colors?: string[]
  stock: { [size: string]: number }
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  size: string
  color?: string
}

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  cost: number // Costo de envío
}

export interface PaymentInfo {
  method: "card" | "paypal" | "transfer"
  cardDetails?: {
    cardNumber: string
    expiryDate: string
    cvv: string
    cardName: string
  }
  // Otros detalles de pago si se añaden más métodos
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
  userId?: string // Opcional, si el usuario está logueado
  customerEmail: string // Email del cliente para confirmaciones
  items: OrderItem[]
  shippingInfo: ShippingInfo
  totalAmount: number
  orderDate: Date
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
}

export interface User {
  id: string
  email: string
  passwordHash: string
  name: string
  addresses: ShippingInfo[]
  wishlist: string[] // Array de IDs de productos
  isAdmin: boolean
}

// Simulación de la base de datos en memoria
interface Database {
  products: Product[]
  orders: Order[]
  users: User[]
}

export const db: Database = {
  products: [
    {
      id: "camiseta-big-dreams",
      name: "Camiseta 'Big Dreams'",
      description: "Camiseta de algodón premium con estampado 'Big Dreams'.",
      price: 85000,
      imageUrl: "/products/camisetas/big-dreams-tshirt.jpg",
      category: "Camisetas",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Negro", "Blanco"],
      stock: { S: 10, M: 15, L: 12, XL: 8 },
    },
    {
      id: "camiseta-oversized-tee",
      name: "Oversized Tee 'Street'",
      description: "Camiseta oversized de estilo urbano, ideal para un look relajado.",
      price: 95000,
      imageUrl: "/products/camisetas/oversized-tee.jpg",
      category: "Camisetas",
      sizes: ["M", "L", "XL"],
      colors: ["Gris", "Negro"],
      stock: { M: 8, L: 10, XL: 7 },
    },
    {
      id: "camiseta-graphic-blood",
      name: "Graphic Tee 'Blood'",
      description: "Camiseta con diseño gráfico audaz y tejido suave.",
      price: 89000,
      imageUrl: "/products/camisetas/graphic-tee-blood.jpg",
      category: "Camisetas",
      sizes: ["S", "M", "L"],
      colors: ["Negro"],
      stock: { S: 5, M: 9, L: 6 },
    },
    {
      id: "camiseta-graphic-pain",
      name: "Graphic Tee 'Pain'",
      description: "Camiseta con estampado 'Pain' para un estilo único.",
      price: 89000,
      imageUrl: "/products/camisetas/graphic-tee-pain.jpg",
      category: "Camisetas",
      sizes: ["M", "L", "XL"],
      colors: ["Blanco"],
      stock: { M: 7, L: 11, XL: 4 },
    },
    // Puedes añadir más productos aquí
  ],
  orders: [],
  users: [],
}

// Funciones de utilidad para la "base de datos"
export async function getProductById(id: string): Promise<Product | undefined> {
  return db.products.find((p) => p.id === id)
}

export async function getAllProducts(): Promise<Product[]> {
  return db.products
}

export async function getUserFromDatabase(email: string): Promise<User | undefined> {
  return db.users.find((user) => user.email === email)
}

export async function saveUserToDatabase(user: User): Promise<void> {
  const index = db.users.findIndex((u) => u.id === user.id)
  if (index !== -1) {
    db.users[index] = user
  } else {
    db.users.push(user)
  }
}
