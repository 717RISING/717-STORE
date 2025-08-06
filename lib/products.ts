export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  sizes?: string[]
  colors?: string[]
  rating?: number
  reviews?: number
}

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Big Dreams",
    description: "Camiseta de algodón 100% con diseño exclusivo Big Dreams",
    price: 89000,
    image: "/products/camisetas/big-dreams-tshirt.png",
    category: "camisetas",
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco"],
    rating: 4.5,
    reviews: 23
  },
  {
    id: "2",
    name: "Camiseta Oversized",
    description: "Camiseta oversized de corte relajado, perfecta para el día a día",
    price: 95000,
    image: "/products/camisetas/oversized-tee.png",
    category: "camisetas",
    stock: 8,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Gris", "Blanco"],
    rating: 4.7,
    reviews: 31
  },
  {
    id: "3",
    name: "Graphic Tee Blood",
    description: "Camiseta con diseño gráfico exclusivo Blood, edición limitada",
    price: 105000,
    image: "/products/camisetas/graphic-tee-blood.png",
    category: "camisetas",
    stock: 5,
    sizes: ["M", "L", "XL"],
    colors: ["Negro", "Rojo"],
    rating: 4.8,
    reviews: 18
  },
  {
    id: "4",
    name: "Graphic Tee Pain",
    description: "Camiseta con diseño gráfico Pain, para los verdaderos fanáticos",
    price: 105000,
    image: "/products/camisetas/graphic-tee-pain.png",
    category: "camisetas",
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco"],
    rating: 4.6,
    reviews: 27
  }
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return products
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return products.find(product => product.id === id)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return products.filter(product => product.category === category)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  )
}
