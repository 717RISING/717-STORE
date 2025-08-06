import { User } from './types' // Assuming you have a types file for User

// Mock user data
const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    role: 'customer',
    createdAt: new Date('2023-01-15T10:00:00Z'),
  },
  {
    id: 'user2',
    name: 'María García',
    email: 'maria.garcia@example.com',
    role: 'customer',
    createdAt: new Date('2023-02-20T11:30:00Z'),
  },
  {
    id: 'user3',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@example.com',
    role: 'admin',
    createdAt: new Date('2023-03-01T09:00:00Z'),
  },
]

export async function getUsers(): Promise<User[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockUsers
}

export async function getUserById(id: string): Promise<User | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockUsers.find(user => user.id === id)
}

export async function addUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  const newUser: User = {
    id: `user${mockUsers.length + 1}`,
    createdAt: new Date(),
    ...user,
  }
  mockUsers.push(newUser)
  return newUser
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockUsers.findIndex(user => user.id === id)
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...updates }
    return mockUsers[index]
  }
  return undefined
}

export async function deleteUser(id: string): Promise<boolean> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  const initialLength = mockUsers.length
  const filteredUsers = mockUsers.filter(user => user.id !== id)
  mockUsers.splice(0, mockUsers.length, ...filteredUsers) // Update the original array
  return mockUsers.length < initialLength
}
