// Configuración de base de datos para 717 Store
import { get } from "@vercel/edge-config"

// Tipos para la base de datos
export interface User {
  id: string
  email: string
  name: string
}

export interface Order {
  id: string
  items: { id: string; quantity: number }[]
  total: number
  createdAt: string
}

export interface DatabaseUser extends User {
  orders?: string[]
  wishlist?: string[]
  addresses?: Address[]
}

export interface Address {
  id: string
  type: "shipping" | "billing"
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface DatabaseOrder extends Order {
  customerEmail: string
  customerName: string
}

export interface DatabaseProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  featured: boolean
  isNew: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

// Configuración de Edge Config
const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID || "ecfg_kupybbigsuqifbwn0sf5ru6hpltm"

// Funciones para usuarios
export async function getUserFromDatabase(email: string): Promise<DatabaseUser | null> {
  try {
    const users = ((await get("users")) as DatabaseUser[]) || []
    return users.find((user) => user.email === email) || null
  } catch (error) {
    console.error("Error fetching user from database:", error)
    return null
  }
}

export async function saveUserToDatabase(user: DatabaseUser): Promise<boolean> {
  try {
    const users = ((await get("users")) as DatabaseUser[]) || []
    const existingIndex = users.findIndex((u) => u.email === user.email)

    if (existingIndex >= 0) {
      users[existingIndex] = user
    } else {
      users.push(user)
    }

    // En un entorno real, aquí actualizarías Edge Config
    console.log("User saved to database:", user.email)
    return true
  } catch (error) {
    console.error("Error saving user to database:", error)
    return false
  }
}

// Funciones para productos
export async function getProductsFromDatabase(): Promise<DatabaseProduct[]> {
  try {
    const products = ((await get("products")) as DatabaseProduct[]) || []
    return products
  } catch (error) {
    console.error("Error fetching products from database:", error)
    return []
  }
}

export async function getProductByIdFromDatabase(id: string): Promise<DatabaseProduct | null> {
  try {
    const products = await getProductsFromDatabase()
    return products.find((product) => product.id === id) || null
  } catch (error) {
    console.error("Error fetching product from database:", error)
    return null
  }
}

export async function updateProductStock(productId: string, quantity: number): Promise<boolean> {
  try {
    const products = await getProductsFromDatabase()
    const productIndex = products.findIndex((p) => p.id === productId)

    if (productIndex >= 0) {
      products[productIndex].stock -= quantity
      products[productIndex].updatedAt = new Date().toISOString()

      // En un entorno real, aquí actualizarías Edge Config
      console.log(`Stock updated for product ${productId}: -${quantity}`)
      return true
    }

    return false
  } catch (error) {
    console.error("Error updating product stock:", error)
    return false
  }
}

// Funciones para pedidos
export async function saveOrderToDatabase(order: DatabaseOrder): Promise<boolean> {
  try {
    const orders = ((await get("orders")) as DatabaseOrder[]) || []
    orders.push(order)

    // Actualizar stock de productos
    for (const item of order.items) {
      await updateProductStock(item.id, item.quantity)
    }

    // En un entorno real, aquí actualizarías Edge Config
    console.log("Order saved to database:", order.id)
    return true
  } catch (error) {
    console.error("Error saving order to database:", error)
    return false
  }
}

export async function getOrdersFromDatabase(): Promise<DatabaseOrder[]> {
  try {
    const orders = ((await get("orders")) as DatabaseOrder[]) || []
    return orders
  } catch (error) {
    console.error("Error fetching orders from database:", error)
    return []
  }
}

export async function getOrderByIdFromDatabase(id: string): Promise<DatabaseOrder | null> {
  try {
    const orders = await getOrdersFromDatabase()
    return orders.find((order) => order.id === id) || null
  } catch (error) {
    console.error("Error fetching order from database:", error)
    return null
  }
}

export async function getUserOrdersFromDatabase(userEmail: string): Promise<DatabaseOrder[]> {
  try {
    const orders = await getOrdersFromDatabase()
    return orders.filter((order) => order.customerEmail === userEmail)
  } catch (error) {
    console.error("Error fetching user orders from database:", error)
    return []
  }
}

// Funciones para inicializar datos
export async function initializeDatabase(): Promise<void> {
  try {
    // Verificar si ya hay datos
    const existingProducts = await get("products")

    if (!existingProducts) {
      // Inicializar con productos de ejemplo
      const initialProducts: DatabaseProduct[] = [
        {
          id: "1",
          name: "717 Dreams T-Shirt",
          price: 39.99,
          category: "camisetas",
          description: "Camiseta premium con diseño exclusivo 717",
          images: ["/placeholder.svg?height=400&width=400"],
          sizes: ["S", "M", "L", "XL"],
          colors: ["Negro", "Blanco"],
          stock: 50,
          featured: true,
          isNew: true,
          tags: ["streetwear", "premium"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        // Más productos...
      ]

      console.log("Database initialized with sample data")
    }
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// Funciones de análisis
export async function getDatabaseStats(): Promise<{
  totalUsers: number
  totalOrders: number
  totalProducts: number
  totalRevenue: number
}> {
  try {
    const [users, orders, products] = await Promise.all([
      get("users") as Promise<DatabaseUser[]>,
      get("orders") as Promise<DatabaseOrder[]>,
      get("products") as Promise<DatabaseProduct[]>,
    ])

    const totalRevenue = (orders || []).reduce((sum, order) => sum + order.total, 0)

    return {
      totalUsers: (users || []).length,
      totalOrders: (orders || []).length,
      totalProducts: (products || []).length,
      totalRevenue,
    }
  } catch (error) {
    console.error("Error fetching database stats:", error)
    return {
      totalUsers: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalRevenue: 0,
    }
  }
}
