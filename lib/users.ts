import { User } from './types'
import { mockUsers } from './mock-data' // Import mock data

// This file would typically contain functions to interact with your user data source (e.g., database, API)

export async function getUsers(): Promise<User[]> {
  // Simulate API call or database fetch
  return new Promise(resolve => setTimeout(() => resolve(mockUsers), 500))
}

export async function getUserById(id: string): Promise<User | undefined> {
  // Simulate API call or database fetch
  return new Promise(resolve => setTimeout(() => resolve(mockUsers.find(u => u.id === id)), 300))
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  // Simulate API call or database fetch
  return new Promise(resolve => setTimeout(() => resolve(mockUsers.find(u => u.email === email)), 300))
}

export async function addUser(user: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'orderCount' | 'totalSpent' | 'isActive'>): Promise<User> {
  // Simulate adding a user to the database
  return new Promise(resolve => {
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
    resolve(newUser)
  })
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
  // Simulate updating a user in the database
  return new Promise(resolve => {
    const index = mockUsers.findIndex(u => u.id === id)
    if (index > -1) {
      mockUsers[index] = { ...mockUsers[index], ...updates }
      resolve(mockUsers[index])
    } else {
      resolve(undefined)
    }
  })
}

export async function deleteUser(id: string): Promise<boolean> {
  // Simulate deleting a user from the database
  return new Promise(resolve => {
    const initialLength = mockUsers.length
    mockUsers.splice(mockUsers.findIndex(u => u.id === id), 1)
    resolve(mockUsers.length < initialLength)
  })
}

export async function loginUser(email: string, passwordAttempt: string): Promise<{ success: boolean; message: string; user?: User }> {
  return new Promise(resolve => {
    const user = mockUsers.find(u => u.email === email)
    if (user && user.passwordHash === passwordAttempt) { // In real app, compare hashed passwords
      resolve({ success: true, message: 'Login successful', user })
    } else {
      resolve({ success: false, message: 'Invalid credentials' })
    }
  })
}

export async function registerUser(name: string, email: string, passwordAttempt: string): Promise<{ success: boolean; message: string; user?: User }> {
  return new Promise(async (resolve) => {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      resolve({ success: false, message: 'Email already registered' })
      return
    }

    const newUser: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'orderCount' | 'totalSpent' | 'isActive'> = {
      name,
      email,
      passwordHash: passwordAttempt, // In real app, hash this
      isAdmin: false,
    }
    const createdUser = await addUser(newUser)
    if (createdUser) {
      resolve({ success: true, message: 'Registration successful', user: createdUser })
    } else {
      resolve({ success: false, message: 'Failed to register user' })
    }
  })
}
