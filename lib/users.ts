// lib/users.ts
// Este archivo maneja la lógica de autenticación y gestión de usuarios.

import { getUserFromDatabase, saveUserToDatabase, ADMIN_USER, type User as DBUser } from "./database"

// Interfaz para el usuario (sin el hash de contraseña para el frontend)
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  createdAt: string // No está en DBUser, pero se puede añadir si es necesario
}

// Función para verificar credenciales de usuario
export async function verifyUserCredentials(email: string, password: string): Promise<DBUser | null> {
  try {
    // Verificar admin primero (usando la contraseña en texto plano del mock)
    if (email === ADMIN_USER.email && password === ADMIN_USER.passwordHash) {
      return ADMIN_USER
    }

    // Buscar en la base de datos mock para otros usuarios (si los hubiera)
    const user = await getUserFromDatabase(email)
    if (user && user.passwordHash === password) {
      return user
    }

    return null
  } catch (error) {
    console.error("Error verifying user credentials:", error)
    return null
  }
}

// Función para registrar un nuevo usuario
export async function registerUser(name: string, email: string, password: string): Promise<DBUser | null> {
  try {
    // Verificar si el email ya existe
    const existingUser = await getUserFromDatabase(email)
    if (existingUser) {
      return null // Email ya registrado
    }

    // Crear nuevo usuario
    const newUser: DBUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      passwordHash: password, // ¡En producción, hashear la contraseña!
      isAdmin: false,
      addresses: [],
      wishlist: [],
    }

    // Guardar en la base de datos mock
    await saveUserToDatabase(newUser)
    return newUser
  } catch (error) {
    console.error("Error registering user:", error)
    return null
  }
}

// Función para verificar si un usuario es admin
export async function isAdmin(email: string): Promise<boolean> {
  try {
    const user = await getUserFromDatabase(email)
    return user?.isAdmin || false
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Función para obtener todos los usuarios (solo para admin)
export async function getAllUsers(): Promise<DBUser[]> {
  // En un entorno real, esto obtendría todos los usuarios de la base de datos
  // Por ahora, devuelve los usuarios del mock db
  return (await import("./database")).db.users
}

// Función para obtener un usuario por ID
export async function getUserById(id: string): Promise<DBUser | null> {
  // En un entorno real, buscaría por ID en la base de datos
  return (await import("./database")).db.users.find((user) => user.id === id) || null
}
