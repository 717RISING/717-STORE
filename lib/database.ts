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
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}

// Simulated database functions
export async function getAllProducts(): Promise<Product[]> {
  return [
    {
      id: '1',
      name: 'Camiseta Big Dreams',
      price: 25000,
      originalPrice: 30000,
      image: '/products/camisetas/big-dreams-tshirt.jpg',
      category: 'Camisetas',
      description: 'Camiseta de algodón con diseño exclusivo Big Dreams',
      stock: 50,
      isNew: true,
      isSale: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Camiseta Oversized',
      price: 28000,
      image: '/products/camisetas/oversized-tee.jpg',
      category: 'Camisetas',
      description: 'Camiseta oversized de corte moderno',
      stock: 30,
      isNew: false,
      isSale: false,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    {
      id: '3',
      name: 'Graphic Tee Blood',
      price: 32000,
      image: '/products/camisetas/graphic-tee-blood.jpg',
      category: 'Camisetas',
      description: 'Camiseta con diseño gráfico exclusivo',
      stock: 25,
      isNew: true,
      isSale: false,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    },
    {
      id: '4',
      name: 'Graphic Tee Pain',
      price: 32000,
      originalPrice: 35000,
      image: '/products/camisetas/graphic-tee-pain.jpg',
      category: 'Camisetas',
      description: 'Camiseta con diseño gráfico Pain',
      stock: 20,
      isNew: false,
      isSale: true,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04')
    }
  ]
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts()
  return products.find(product => product.id === id) || null
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getAllProducts()
  return products.filter(product => product.category === category)
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getAllProducts()
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  )
}

export async function getOrders(): Promise<Order[]> {
  return [
    {
      id: '1',
      userId: '1',
      items: [
        { productId: '1', quantity: 2, price: 25000 },
        { productId: '2', quantity: 1, price: 28000 }
      ],
      total: 78000,
      status: 'delivered',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      userId: '2',
      items: [
        { productId: '3', quantity: 1, price: 32000 }
      ],
      total: 32000,
      status: 'processing',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    }
  ]
}
