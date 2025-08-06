export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

// This file defines the Product interface.
// The actual mock data and data fetching functions are in `lib/database.ts`.

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Big Dreams",
    description: "Camiseta de algodón 100% con diseño exclusivo Big Dreams",
    price: 89000,
    image: "/products/camisetas/big-dreams-tshirt.png",
    category: "camisetas",
    stock: 15
  },
  {
    id: "2",
    name: "Camiseta Oversized",
    description: "Camiseta oversized de corte relajado, perfecta para el día a día",
    price: 95000,
    image: "/products/camisetas/oversized-tee.png",
    category: "camisetas",
    stock: 8
  },
  {
    id: "3",
    name: "Graphic Tee Blood",
    description: "Camiseta con diseño gráfico exclusivo Blood, edición limitada",
    price: 105000,
    image: "/products/camisetas/graphic-tee-blood.png",
    category: "camisetas",
    stock: 5
  },
  {
    id: "4",
    name: "Graphic Tee Pain",
    description: "Camiseta con diseño gráfico Pain, para los verdaderos fanáticos",
    price: 105000,
    image: "/products/camisetas/graphic-tee-pain.png",
    category: "camisetas",
    stock: 12
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
