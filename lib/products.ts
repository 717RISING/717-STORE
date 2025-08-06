import { Product } from './types' // Assuming you have a types file for Product

// Mock product data
const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Camiseta Oversized "Big Dreams"',
    description: 'Camiseta oversized de algodón premium con estampado "Big Dreams" en la espalda. Perfecta para un look relajado y moderno.',
    price: 35.00,
    category: 'Camisetas',
    image: '/products/camisetas/big-dreams-tshirt.png',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 120,
    details: [
      'Material: 100% Algodón peinado',
      'Corte: Oversized',
      'Estampado: Serigrafía de alta durabilidad',
      'Color: Negro',
      'Instrucciones de cuidado: Lavar a máquina en frío, no usar blanqueador, secar a baja temperatura.'
    ]
  },
  {
    id: 'prod2',
    name: 'Pantalón Cargo Urbano',
    description: 'Pantalón cargo de estilo urbano con múltiples bolsillos y ajuste cómodo. Ideal para el día a día y aventuras urbanas.',
    price: 65.00,
    category: 'Pantalones',
    image: '/placeholder.svg?height=400&width=400',
    sizes: ['28', '30', '32', '34', '36'],
    rating: 4.2,
    reviews: 85,
    details: [
      'Material: 60% Algodón, 40% Poliéster',
      'Corte: Relajado',
      'Bolsillos: 6 bolsillos funcionales',
      'Color: Verde Militar',
      'Características: Cintura elástica con cordón, puños ajustables.'
    ]
  },
  {
    id: 'prod3',
    name: 'Chaqueta Rompevientos Reflectante',
    description: 'Chaqueta ligera rompevientos con detalles reflectantes para mayor visibilidad. Perfecta para actividades al aire libre y estilo nocturno.',
    price: 80.00,
    category: 'Chaquetas',
    image: '/placeholder.svg?height=400&width=400',
    sizes: ['S', 'M', 'L'],
    rating: 4.7,
    reviews: 60,
    details: [
      'Material: 100% Poliéster impermeable',
      'Características: Capucha ajustable, cremallera frontal, puños elásticos',
      'Color: Gris con detalles reflectantes',
      'Ideal para: Correr, ciclismo, uso diario.'
    ]
  },
  {
    id: 'prod4',
    name: 'Gorra Snapback "717"',
    description: 'Gorra clásica snapback con el logo bordado "717". Un accesorio esencial para completar tu look streetwear.',
    price: 25.00,
    category: 'Accesorios',
    image: '/placeholder.svg?height=400&width=400',
    sizes: ['Talla Única'],
    rating: 4.8,
    reviews: 200,
    details: [
      'Material: 80% Acrílico, 20% Lana',
      'Ajuste: Cierre snapback ajustable',
      'Bordado: Logo "717" en 3D',
      'Color: Negro'
    ]
  },
  {
    id: 'prod5',
    name: 'Camiseta Gráfica "Blood"',
    description: 'Camiseta de algodón suave con un diseño gráfico audaz. Expresa tu estilo sin límites.',
    price: 40.00,
    category: 'Camisetas',
    image: '/products/camisetas/graphic-tee-blood.png',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.3,
    reviews: 90,
    details: [
      'Material: 100% Algodón',
      'Corte: Regular fit',
      'Estampado: Impresión digital de alta calidad',
      'Color: Blanco'
    ]
  },
  {
    id: 'prod6',
    name: 'Sudadera con Capucha "Pain"',
    description: 'Sudadera cómoda y cálida con un diseño minimalista "Pain". Ideal para el invierno.',
    price: 70.00,
    category: 'Chaquetas',
    image: '/products/camisetas/graphic-tee-pain.png',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 75,
    details: [
      'Material: 80% Algodón, 20% Poliéster (felpa francesa)',
      'Corte: Relajado',
      'Características: Capucha con cordón, bolsillo canguro',
      'Color: Gris Heather'
    ]
  },
  {
    id: 'prod7',
    name: 'Calcetines de Diseño Urbano',
    description: 'Pack de 3 pares de calcetines con diseños únicos inspirados en el arte urbano. Comodidad y estilo para tus pies.',
    price: 18.00,
    category: 'Accesorios',
    image: '/placeholder.svg?height=400&width=400',
    sizes: ['Talla Única'],
    rating: 4.0,
    reviews: 50,
    details: [
      'Material: 70% Algodón, 25% Poliéster, 5% Spandex',
      'Pack: 3 pares',
      'Diseños: Variados, inspirados en graffiti y arte callejero',
      'Características: Transpirables, elásticos.'
    ]
  },
  {
    id: 'prod8',
    name: 'Mochila Roll-Top Impermeable',
    description: 'Mochila moderna con cierre roll-top y material impermeable. Perfecta para la ciudad o tus escapadas.',
    price: 95.00,
    category: 'Accesorios',
    image: '/placeholder.svg?height=400&width=400',
    sizes: ['N/A'],
    rating: 4.9,
    reviews: 40,
    details: [
      'Material: Lona de PVC impermeable',
      'Capacidad: 20 Litros',
      'Características: Compartimento para laptop, bolsillos laterales, correas acolchadas',
      'Color: Negro Mate'
    ]
  },
]

export async function getProducts(): Promise<Product[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700))
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockProducts.find(product => product.id === id)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600))
  // Return a subset of products as featured
  return mockProducts.filter((_, index) => index < 4)
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  const newProduct: Product = {
    id: `prod${mockProducts.length + 1}`,
    ...product,
  }
  mockProducts.push(newProduct)
  return newProduct
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockProducts.findIndex(product => product.id === id)
  if (index !== -1) {
    mockProducts[index] = { ...mockProducts[index], ...updates }
    return mockProducts[index]
  }
  return undefined
}

export async function deleteProduct(id: string): Promise<boolean> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  const initialLength = mockProducts.length
  const filteredProducts = mockProducts.filter(product => product.id !== id)
  mockProducts.splice(0, mockProducts.length, ...filteredProducts) // Update the original array
  return mockProducts.length < initialLength
}
