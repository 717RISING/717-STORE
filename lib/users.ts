export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}

export async function getUsers(): Promise<User[]> {
  // Simulated user data
  return [
    {
      id: '1',
      email: 'admin@717store.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ]
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers()
  return users.find(user => user.id === id) || null
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const newUser: User = {
    ...userData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  return newUser
}
