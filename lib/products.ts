export interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  sizes: string[]
  category: string
  isNew?: boolean
  tags: string[]
}

export const products: Product[] = [
  {
    id: "big-dreams-tshirt",
    name: "BIG DREAMS T-SHIRT",
    price: 29.99,
    description:
      "Camiseta con diseño exclusivo que representa los grandes sueños. Confeccionada en algodón 100% premium con estampado de alta calidad. Perfecta para el día a día con un toque urbano único.",
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "camisetas",
    isNew: true,
    tags: ["algodón", "urbano", "sueños", "exclusivo"],
  },
  {
    id: "urban-hoodie",
    name: "URBAN HOODIE",
    price: 59.99,
    description:
      "Sudadera con capucha premium de la colección urbana. Tejido suave y cómodo con forro interior. Diseño minimalista con detalles únicos que la hacen perfecta para cualquier ocasión.",
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "sudaderas",
    tags: ["capucha", "urbano", "cómodo", "minimalista"],
  },
  {
    id: "street-pants",
    name: "STREET PANTS",
    price: 49.99,
    description:
      "Pantalones urbanos cómodos con corte moderno. Fabricados con materiales de alta calidad que garantizan durabilidad y comodidad. Ideales para el estilo streetwear contemporáneo.",
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    category: "pantalones",
    tags: ["urbano", "cómodo", "moderno", "streetwear"],
  },
  {
    id: "classic-cap",
    name: "CLASSIC CAP",
    price: 24.99,
    description:
      "Gorra clásica con logo bordado 717. Ajuste perfecto con cierre trasero. Material resistente y cómodo para uso diario. Un accesorio esencial para completar tu look urbano.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["Única"],
    category: "accesorios",
    tags: ["gorra", "logo", "bordado", "ajustable"],
  },
  {
    id: "oversized-tee",
    name: "OVERSIZED TEE",
    price: 34.99,
    description:
      "Camiseta oversized con corte relajado. Perfecta para un look casual y cómodo. Estampado frontal minimalista que refleja la esencia de la marca 717.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "camisetas",
    isNew: true,
    tags: ["oversized", "relajado", "casual", "minimalista"],
  },
  {
    id: "cargo-shorts",
    name: "CARGO SHORTS",
    price: 39.99,
    description:
      "Shorts cargo con múltiples bolsillos funcionales. Diseño urbano con detalles únicos. Perfectos para el verano con un estilo streetwear auténtico.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["28", "30", "32", "34", "36"],
    category: "pantalones",
    tags: ["cargo", "bolsillos", "verano", "funcional"],
  },
  {
    id: "zip-hoodie",
    name: "ZIP HOODIE",
    price: 64.99,
    description:
      "Sudadera con capucha y cierre frontal. Diseño versátil que se adapta a cualquier ocasión. Bolsillos frontales y ajuste cómodo para máxima comodidad.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "sudaderas",
    tags: ["cierre", "versátil", "bolsillos", "cómodo"],
  },
  {
    id: "bucket-hat",
    name: "BUCKET HAT",
    price: 27.99,
    description:
      "Sombrero bucket con estilo retro-urbano. Material resistente al agua y protección UV. Perfecto para festivales y actividades al aire libre.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["S/M", "L/XL"],
    category: "accesorios",
    tags: ["bucket", "retro", "resistente", "protección"],
  },
  {
    id: "graphic-tee",
    name: "GRAPHIC TEE",
    price: 32.99,
    description:
      "Camiseta con gráfico artístico exclusivo. Diseño limitado que combina arte urbano con moda streetwear. Una pieza única para coleccionistas.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "camisetas",
    tags: ["gráfico", "artístico", "limitado", "colección"],
  },
  {
    id: "track-pants",
    name: "TRACK PANTS",
    price: 54.99,
    description:
      "Pantalones deportivos con bandas laterales. Comodidad y estilo en una sola prenda. Perfectos para entrenar o para un look casual urbano.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "pantalones",
    tags: ["deportivo", "bandas", "entrenar", "casual"],
  },
]

export const categories = [
  { id: "all", name: "Todos", count: products.length },
  { id: "camisetas", name: "Camisetas", count: products.filter((p) => p.category === "camisetas").length },
  { id: "sudaderas", name: "Sudaderas", count: products.filter((p) => p.category === "sudaderas").length },
  { id: "pantalones", name: "Pantalones", count: products.filter((p) => p.category === "pantalones").length },
  { id: "accesorios", name: "Accesorios", count: products.filter((p) => p.category === "accesorios").length },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function searchProducts(query: string, category = "all", sortBy = "name"): Product[] {
  let filteredProducts = products

  // Filter by category
  if (category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  // Filter by search query
  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }

  // Sort products
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "newest":
      filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
    default:
      break
  }

  return filteredProducts
}
