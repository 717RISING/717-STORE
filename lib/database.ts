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
  stock: { [size: string]: number } // Stock por talla
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
  customerName?: string // Nombre del cliente (para invitados o display)
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
  passwordHash: string // En un sistema real, esto sería un hash
  name: string
  addresses?: ShippingInfo[] // Direcciones guardadas del usuario
  wishlist?: string[] // Array de IDs de productos en la wishlist
  isAdmin: boolean
}

// Definición del usuario administrador
export const ADMIN_USER: User = {
  id: "admin-717",
  email: "717days@gmail.com",
  passwordHash: "JP7CR1DM7CM_STREETWEAR", // ¡En producción, usa un hash seguro!
  name: "Administrador 717",
  isAdmin: true,
  addresses: [],
  wishlist: [],
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
      imageUrl: "/products/camisetas/big-dreams-tshirt.png",
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
      imageUrl: "/products/camisetas/oversized-tee.png",
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
      imageUrl: "/products/camisetas/graphic-tee-blood.png",
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
      imageUrl: "/products/camisetas/graphic-tee-pain.png",
      category: "Camisetas",
      sizes: ["M", "L", "XL"],
      colors: ["Blanco"],
      stock: { M: 7, L: 11, XL: 4 },
    },
    // Puedes añadir más productos aquí
  ],
  orders: [], // Inicialmente vacía
  users: [ADMIN_USER], // Solo el admin al inicio
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

export async function getAllUsers(): Promise<User[]> {
  return db.users
}

// Funciones para órdenes (solo interacción con la DB mock, sin lógica de email aquí)
export async function saveOrderToDatabase(order: Order): Promise<void> {
  db.orders.push(order)
  console.log(`Pedido ${order.id} guardado en la base de datos mock.`)
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  return db.orders.find((order) => order.id === orderId) || null
}

export async function getAllOrders(): Promise<Order[]> {
  return db.orders
}

export async function updateProductStock(productId: string, size: string, quantity: number): Promise<boolean> {
  const product = db.products.find((p) => p.id === productId)
  if (product && product.stock[size] !== undefined) {
    product.stock[size] -= quantity
    if (product.stock[size] < 0) product.stock[size] = 0 // Evitar stock negativo
    console.log(`Stock de ${product.name} (${size}) actualizado a ${product.stock[size]}`)
    return true
  }
  return false
}
