import { createClient } from '@supabase/supabase-js'
import { Product, User, Order, ShippingAddress, OrderItem } from './types'
import { mockProducts, mockUsers, mockOrders } from './mock-data' // Import mock data from new file

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Simulate database delays
const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// --- Product Functions ---
export async function getAllProducts(): Promise<Product[]> {
  await simulateDelay(500) // Simulate network delay
  // In a real app, you'd fetch from Supabase:
  // const { data, error } = await supabase.from('products').select('*');
  // if (error) throw error;
  // return data as Product[];
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await simulateDelay(300)
  // In a real app, you'd fetch from Supabase:
  // const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  // if (error) throw error;
  // return data as Product;
  return mockProducts.find((product) => product.id === id)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await simulateDelay(400)
  // In a real app, you'd fetch from Supabase with a filter for featured products
  return mockProducts.filter((product) => ['1', '2', '5', '8'].includes(product.id))
}

// --- User Functions ---
export async function getAllUsers(): Promise<User[]> {
  await simulateDelay(500)
  // In a real app, you'd fetch from Supabase:
  // const { data, error } = await supabase.from('users').select('*');
  // if (error) throw error;
  // return data as User[];
  return mockUsers
}

export async function getUserById(id: string): Promise<User | undefined> {
  await simulateDelay(300)
  // In a real app, you'd fetch from Supabase:
  // const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  // if (error) throw error;
  // return data as User;
  return mockUsers.find((user) => user.id === id)
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  await simulateDelay(300)
  // In a real app, you'd fetch from Supabase:
  // const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  // if (error) throw error;
  // return data as User;
  return mockUsers.find((user) => user.email === email)
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'orderCount' | 'totalSpent' | 'isActive'>): Promise<User> {
  await simulateDelay(500)
  const newUser: User = {
    id: `user${mockUsers.length + 1}`,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    orderCount: 0,
    totalSpent: 0,
    isActive: true,
    ...user,
  }
  mockUsers.push(newUser)
  return newUser
}

export async function updateUser(updatedUser: User): Promise<User> {
  await simulateDelay(500)
  const index = mockUsers.findIndex((user) => user.id === updatedUser.id)
  if (index !== -1) {
    mockUsers[index] = updatedUser
    return updatedUser
  }
  throw new Error('User not found')
}

// --- Order Functions ---
export async function getAllOrders(): Promise<Order[]> {
  await simulateDelay(500)
  // In a real app, you'd fetch from Supabase:
  // const { data, error } = await supabase.from('orders').select('*');
  // if (error) throw error;
  // return data as Order[];
  return mockOrders
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  await simulateDelay(300)
  // In a real app, you'd fetch from Supabase:
  // const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
  // if (error) throw error;
  // return data as Order;
  return mockOrders.find((order) => order.id === id)
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  await simulateDelay(300)
  // In a real app, you'd fetch from Supabase:
  // const { data, error } = await supabase.from('orders').select('*').eq('userId', userId);
  // if (error) throw error;
  // return data as Order[];
  return mockOrders.filter((order) => order.userId === userId)
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  await simulateDelay(500)
  const newOrder: Order = {
    id: `ORD${(mockOrders.length + 1).toString().padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...order,
  }
  mockOrders.push(newOrder)
  return newOrder
}

export async function updateOrderStatus(orderId: string, newStatus: Order['status']): Promise<Order> {
  await simulateDelay(500)
  const order = mockOrders.find((o) => o.id === orderId)
  if (order) {
    order.status = newStatus
    order.updatedAt = new Date().toISOString()
    return order
  }
  throw new Error('Order not found')
}

// --- Shipping Address Functions ---
export async function addShippingAddress(address: Omit<ShippingAddress, 'id'>): Promise<ShippingAddress> {
  await simulateDelay(300)
  const newAddress: ShippingAddress = {
    id: `addr${Math.random().toString(36).substr(2, 9)}`,
    ...address,
  }
  // In a real app, you'd insert into Supabase
  return newAddress
}

export async function getShippingAddressesByUserId(userId: string): Promise<ShippingAddress[]> {
  await simulateDelay(300)
  // In a real app, you'd fetch from Supabase
  return mockUsers.find(u => u.id === userId)?.shippingAddresses || []
}
