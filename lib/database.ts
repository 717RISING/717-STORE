export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  sizes: string[]
  stock: { [key: string]: number } // e.g., { "S": 10, "M": 5 }
  reviews?: Review[]
  rating?: number
  isFeatured?: boolean
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  image: string
}

export interface User {
  id: string
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  addresses: Address[]
  paymentMethods: PaymentMethod[]
  wishlist: string[] // Array of product IDs
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

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  imageUrl?: string
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
  email: string
  cost: number // Added to store shipping cost for the order
}

export interface PaymentInfo {
  method: "card" | "paypal" | "bank_transfer"
  cardDetails?: {
    cardNumber: string
    cardName: string
    expiryDate: string
    cvv: string
  }
  paypalEmail?: string
  bankTransferDetails?: {
    bankName: string
    accountNumber: string
  }
}

export interface Order {
  id: string
  customerEmail: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: ShippingInfo
  payment: PaymentInfo
  total: number
  status: "Pendiente" | "Procesando" | "Enviado" | "Entregado" | "Cancelado"
  createdAt: string // ISO string date
  updatedAt?: string // ISO string date
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
interface Database {
  products: Product[]
  users: User[]
  orders: Order[]
  reviews: Review[]
}

export const db: Database = {
  products: [],
  users: [],
  orders: [],
  reviews: [],
}
