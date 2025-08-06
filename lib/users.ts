import bcrypt from 'bcryptjs'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'customer'
  createdAt: Date
  password?: string // Only include for internal use, not for public API
}

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@717store.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // Hashed 'password'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Test User',
    role: 'customer',
    createdAt: new Date(),
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // Hashed 'password'
  }
]

export async function getUsers(): Promise<User[]> {
  // Return users without their passwords
  return mockUsers.map(user => {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
  })
}

export async function getUserById(id: string): Promise<User | null> {
  const user = mockUsers.find(user => user.id === id)
  if (!user) return null
  
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

export async function verifyUserCredentials(email: string, password: string): Promise<User | null> {
  const user = mockUsers.find(u => u.email === email)
  if (!user || !user.password) return null
  
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return null
  
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

export async function registerUser(firstName: string, lastName: string, email: string, password: string): Promise<User | null> {
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email)
  if (existingUser) return null
  
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9), // Simple unique ID
    email,
    name: `${firstName} ${lastName}`,
    role: 'customer',
    createdAt: new Date(),
    password: hashedPassword
  }
  
  mockUsers.push(newUser)
  
  const { password: _, ...userWithoutPassword } = newUser
  return userWithoutPassword as User
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const newUser: User = {
    ...userData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date()
  }
  
  mockUsers.push(newUser)
  return newUser
}
