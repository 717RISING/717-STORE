// Sistema de usuarios simulado para 717 Store
export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "user"
  createdAt: string
}

// Base de datos de usuarios simulada
const users: User[] = [
  {
    id: "1",
    name: "Administrador 717",
    email: "717days@gmail.com",
    password: "JP7CR1DM7CM_STREETWEAR",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

// Función para verificar credenciales de usuario
export function verifyUserCredentials(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password)
  return user || null
}

// Función para registrar un nuevo usuario
export function registerUser(name: string, email: string, password: string): User | null {
  // Verificar si el email ya existe
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return null // Email ya registrado
  }

  // Crear nuevo usuario
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role: "user",
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  return newUser
}

// Función para verificar si un usuario es admin
export function isAdmin(email: string): boolean {
  const user = users.find((u) => u.email === email)
  return user?.role === "admin" || false
}

// Función para obtener todos los usuarios (solo para admin)
export function getAllUsers(): User[] {
  return users.map((user) => ({
    ...user,
    password: "***", // No exponer contraseñas
  }))
}

// Función para obtener un usuario por ID
export function getUserById(id: string): User | null {
  const user = users.find((u) => u.id === id)
  if (user) {
    return {
      ...user,
      password: "***", // No exponer contraseña
    }
  }
  return null
}
