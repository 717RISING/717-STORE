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
    price: 89900,
    description:
      "Camiseta con diseño exclusivo 'Big Hit Big Dreams'. Confeccionada en algodón 100% premium con estampado de alta calidad. El frente presenta el icónico logo 717, mientras que la parte trasera muestra un diseño artístico con nubes y filosofía de grandes sueños.",
    images: [
      "/products/camisetas/big-dreams-tshirt.jpg",
      "/products/camisetas/big-dreams-tshirt.jpg",
      "/products/camisetas/big-dreams-tshirt.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "camisetas",
    isNew: true,
    tags: ["algodón", "urbano", "sueños", "exclusivo", "717", "blanco"],
  },
  {
    id: "oversized-tee",
    name: "TO U & U CITY TEE",
    price: 104900,
    description:
      "Camiseta oversized con diseño urbano exclusivo. El frente presenta el logo 717 minimalista, mientras que la parte trasera muestra un impresionante diseño 'To U & U City' con ilustración de paisaje urbano. Perfecta para el estilo streetwear contemporáneo.",
    images: [
      "/products/camisetas/oversized-tee.jpg",
      "/products/camisetas/oversized-tee.jpg",
      "/products/camisetas/oversized-tee.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "camisetas",
    isNew: true,
    tags: ["oversized", "urbano", "ciudad", "streetwear", "717", "blanco"],
  },
  {
    id: "graphic-tee-blood",
    name: "THE BLOOD OF CHRIST TEE",
    price: 98900,
    description:
      "Camiseta con diseño gráfico religioso exclusivo. Presenta el número 717 en rojo en el frente y un poderoso diseño 'The Blood of Christ' en la parte trasera con ilustración de cáliz sagrado. Una pieza única que combina fe y moda urbana.",
    images: [
      "/products/camisetas/graphic-tee-blood.jpg",
      "/products/camisetas/graphic-tee-blood.jpg",
      "/products/camisetas/graphic-tee-blood.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "camisetas",
    tags: ["gráfico", "religioso", "exclusivo", "717", "negro", "rojo"],
  },
  {
    id: "graphic-tee-pain",
    name: "OLD PAIN TEE",
    price: 98900,
    description:
      "Camiseta con diseño artístico 'Old Pain'. El frente presenta la frase 'OLD PAIN' en tipografía dorada, mientras que la parte trasera muestra una impactante ilustración de una figura en llamas. Arte urbano que expresa emociones profundas.",
    images: [
      "/products/camisetas/graphic-tee-pain.jpg",
      "/products/camisetas/graphic-tee-pain.jpg",
      "/products/camisetas/graphic-tee-pain.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "camisetas",
    tags: ["gráfico", "artístico", "emocional", "717", "negro", "dorado"],
  },
  {
    id: "urban-hoodie",
    name: "URBAN HOODIE",
    price: 179900,
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
    price: 149900,
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
    price: 74900,
    description:
      "Gorra clásica con logo bordado 717. Ajuste perfecto con cierre trasero. Material resistente y cómodo para uso diario. Un accesorio esencial para completar tu look urbano.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["Única"],
    category: "accesorios",
    tags: ["gorra", "logo", "bordado", "ajustable"],
  },
  {
    id: "cargo-shorts",
    name: "CARGO SHORTS",
    price: 119900,
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
    price: 194900,
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
    price: 83900,
    description:
      "Sombrero bucket con estilo retro-urbano. Material resistente al agua y protección UV. Perfecto para festivales y actividades al aire libre.",
    images: ["/placeholder.svg?height=600&width=500", "/placeholder.svg?height=600&width=500"],
    sizes: ["S/M", "L/XL"],
    category: "accesorios",
    tags: ["bucket", "retro", "resistente", "protección"],
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

// Función para formatear precios en pesos colombianos
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
