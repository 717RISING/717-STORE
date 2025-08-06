import { sql } from "@vercel/postgres"
import { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  try {
    const { rows } = await sql`SELECT * FROM products ORDER BY created_at DESC`
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      category: row.category,
      images: row.images || [],
      stock: row.stock,
      discountPercentage: row.discount_percentage || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      sizes: row.sizes || [],
      colors: row.colors || [],
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { rows } = await sql`SELECT * FROM products WHERE id = ${id}`
    if (rows.length === 0) return null
    const row = rows[0]
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      category: row.category,
      images: row.images || [],
      stock: row.stock,
      discountPercentage: row.discount_percentage || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      sizes: row.sizes || [],
      colors: row.colors || [],
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}
