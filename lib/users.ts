// Sistema de usuarios simulado
export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "user" | "admin"
  createdAt: string
}

// Base de datos simulada de usuarios
export const registeredUsers: User[] = [
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
  const user = registeredUsers.find((u) => u.email === email && u.password === password)
  return user || null
}

// Función para registrar nuevo usuario
export function registerUser(name: string, email: string, password: string): User | null {
  // Verificar si el email ya existe
  const existingUser = registeredUsers.find((u) => u.email === email)
  if (existingUser) {
    return null // Email ya registrado
  }

  const newUser: User = {
    id: (registeredUsers.length + 1).toString(),
    name,
    email,
    password,
    role: "user",
    createdAt: new Date().toISOString(),
  }

  registeredUsers.push(newUser)
  return newUser
}

// Función para obtener usuario por email
export function getUserByEmail(email: string): User | null {
  return registeredUsers.find((u) => u.email === email) || null
}

// Función para verificar si es admin
export function isAdmin(email: string): boolean {
  const user = getUserByEmail(email)
  return user?.role === "admin" || false
}
