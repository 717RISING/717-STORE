import { createClient } from '@supabase/supabase-js'
import { Product, User, Order, ShippingAddress } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
  return data as Product
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*')
  if (error) {
    console.error('Error fetching users:', error)
    return []
  }
  return data as User[]
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching user by ID:', error)
    return null
  }
  return data as User
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase.from('orders').select('*')
  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }
  return data as Order[]
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await supabase.from('orders').select('*').eq('id', id).single()
  if (error) {
    console.error('Error fetching order by ID:', error)
    return null
  }
  return data as Order
}

export async function addOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order | null> {
  const { data, error } = await supabase.from('orders').insert(order).select().single()
  if (error) {
    console.error('Error adding order:', error)
    return null
  }
  return data as Order
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  const { data, error } = await supabase.from('orders').update(updates).eq('id', id).select().single()
  if (error) {
    console.error('Error updating order:', error)
    return null
  }
  return data as Order
}

export async function deleteOrder(id: string): Promise<boolean> {
  const { error } = await supabase.from('orders').delete().eq('id', id)
  if (error) {
    console.error('Error deleting order:', error)
    return false
  }
  return true
}

export async function addShippingAddress(address: Omit<ShippingAddress, 'id'>): Promise<ShippingAddress | null> {
  const { data, error } = await supabase.from('shipping_addresses').insert(address).select().single()
  if (error) {
    console.error('Error adding shipping address:', error)
    return null
  }
  return data as ShippingAddress
}

export async function getShippingAddressesByUserId(userId: string): Promise<ShippingAddress[]> {
  const { data, error } = await supabase.from('shipping_addresses').select('*').eq('user_id', userId)
  if (error) {
    console.error('Error fetching shipping addresses:', error)
    return []
  }
  return data as ShippingAddress[]
}
