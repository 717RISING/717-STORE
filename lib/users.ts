export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: Date
}

export async function getUsers(): Promise<User[]> {
  // Mock data for now
  return [
    {
      id: '1',
      email: 'admin@717store.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date()
    }
  ]
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers()
  return users.find(user => user.id === id) || null
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const newUser: User = {
    ...userData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date()
  }
  return newUser
}
