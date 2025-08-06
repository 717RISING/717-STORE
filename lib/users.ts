import { sql } from "@vercel/postgres"
import { User } from "@/lib/types"

export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`
    return result.rows[0] as User || null
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`
    return result.rows[0] as User || null
  } catch (error) {
    console.error("Error fetching user by email:", error)
    return null
  }
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User | null> {
  try {
    const result = await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${user.name}, ${user.email}, ${user.password}, ${user.role})
      RETURNING *
    `
    return result.rows[0] as User || null
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null> {
  try {
    const setClauses = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ")
    const values = Object.values(updates)

    if (values.length === 0) {
      return await getUserById(id) // No updates, just return current user
    }

    const result = await sql`
      UPDATE users
      SET ${sql.raw(setClauses)}
      WHERE id = ${id}
      RETURNING *
    `
    return result.rows[0] as User || null
  } catch (error) {
    console.error("Error updating user:", error)
    return null
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const result = await sql`DELETE FROM users WHERE id = ${id}`
    return result.rowCount > 0
  } catch (error) {
    console.error("Error deleting user:", error)
    return false
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const result = await sql`SELECT * FROM users ORDER BY created_at DESC`
    return result.rows as User[]
  } catch (error) {
    console.error("Error fetching all users:", error)
    return []
  }
}
