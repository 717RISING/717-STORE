import { getUserFromDatabase, saveUserToDatabase, type DatabaseUser } from "./database"

// Sistema de usuarios con integración a base de datos
export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "user"
  createdAt: string
}

// Usuario admin predefinido
const ADMIN_USER: User = {
  id: "1",
  name: "Administrador 717",
  email: "717days@gmail.com",
  password: "JP7CR1DM7CM_STREETWEAR",
  role: "admin",
  createdAt: "2024-01-01T00:00:00Z",
}

// Función para verificar credenciales de usuario
export async function verifyUserCredentials(email: string, password: string): Promise<User | null> {
  try {
    // Verificar admin primero
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
      return ADMIN_USER
    }

    // Buscar en la base de datos
    const user = await getUserFromDatabase(email)
    if (user && user.password === password) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        createdAt: user.createdAt,
      }
    }

    return null
  } catch (error) {
    console.error("Error verifying user credentials:", error)
    return null
  }
}

// Función para registrar un nuevo usuario
export async function registerUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    // Verificar si el email ya existe
    const existingUser = await getUserFromDatabase(email)
    if (existingUser) {
      return null // Email ya registrado
    }

    // Crear nuevo usuario
    const newUser: DatabaseUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "user",
      createdAt: new Date().toISOString(),
      orders: [],
      wishlist: [],
      addresses: [],
    }

    // Guardar en la base de datos
    const saved = await saveUserToDatabase(newUser)
    if (saved) {
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        createdAt: newUser.createdAt,
      }
    }

    return null
  } catch (error) {
    console.error("Error registering user:", error)
    return null
  }
}

// Función para verificar si un usuario es admin
export async function isAdmin(email: string): Promise<boolean> {
  try {
    if (email === ADMIN_USER.email) {
      return true
    }

    const user = await getUserFromDatabase(email)
    return user?.role === "admin" || false
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Función para obtener todos los usuarios (solo para admin)
export async function getAllUsers(): Promise<User[]> {
  try {
    // En un entorno real, esto obtendría todos los usuarios de la base de datos
    return [
      {
        ...ADMIN_USER,
        password: "***", // No exponer contraseñas
      },
    ]
  } catch (error) {
    console.error("Error fetching all users:", error)
    return []
  }
}

// Función para obtener un usuario por ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    if (id === ADMIN_USER.id) {
      return {
        ...ADMIN_USER,
        password: "***", // No exponer contraseña
      }
    }

    // Buscar en la base de datos por ID
    // Esta función necesitaría ser implementada en database.ts
    return null
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return null
  }
}
