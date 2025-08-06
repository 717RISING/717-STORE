export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
  stock: number
  isNew?: boolean
  isSale?: boolean
  sizes?: string[]
  colors?: string[]
  tags?: string[]
}

export async function getProducts(): Promise<Product[]> {
  // Simulated API call
  return [
    {
      id: '1',
      name: 'Camiseta Big Dreams',
      price: 25000,
      originalPrice: 30000,
      image: '/products/camisetas/big-dreams-tshirt.jpg',
      category: 'Camisetas',
      description: 'Camiseta de algodón 100% con diseño exclusivo Big Dreams. Perfecta para el uso diario con un estilo urbano único.',
      stock: 50,
      isNew: true,
      isSale: true,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Blanco'],
      tags: ['streetwear', 'urban', 'dreams']
    },
    {
      id: '2',
      name: 'Camiseta Oversized',
      price: 28000,
      image: '/products/camisetas/oversized-tee.jpg',
      category: 'Camisetas',
      description: 'Camiseta oversized de corte moderno y cómodo. Ideal para un look relajado y contemporáneo.',
      stock: 30,
      isNew: false,
      isSale: false,
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Negro', 'Gris', 'Blanco'],
      tags: ['oversized', 'comfort', 'modern']
    },
    {
      id: '3',
      name: 'Graphic Tee Blood',
      price: 32000,
      image: '/products/camisetas/graphic-tee-blood.jpg',
      category: 'Camisetas',
      description: 'Camiseta con diseño gráfico exclusivo Blood. Arte urbano plasmado en una prenda de alta calidad.',
      stock: 25,
      isNew: true,
      isSale: false,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Rojo'],
      tags: ['graphic', 'art', 'exclusive']
    },
    {
      id: '4',
      name: 'Graphic Tee Pain',
      price: 32000,
      originalPrice: 35000,
      image: '/products/camisetas/graphic-tee-pain.jpg',
      category: 'Camisetas',
      description: 'Camiseta con diseño gráfico Pain. Expresión artística que combina estilo y actitud.',
      stock: 20,
      isNew: false,
      isSale: true,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Blanco'],
      tags: ['graphic', 'pain', 'attitude']
    }
  ]
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find(product => product.id === id) || null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(product => product.category === category)
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts()
  const lowercaseQuery = query.toLowerCase()
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts()
  return products.filter(product => product.isNew || product.isSale)
}

export async function getRelatedProducts(productId: string, category: string): Promise<Product[]> {
  const products = await getProducts()
  return products
    .filter(product => product.id !== productId && product.category === category)
    .slice(0, 4)
}
