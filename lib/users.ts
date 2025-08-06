import { User } from './types'; // Import User interface from types.ts
import bcrypt from 'bcryptjs'; // This import was in the previous version, keeping it for consistency
import { mockUsers } from '@/scripts/setup-database'; // Assuming mockUsers is exported from setup-database.js

// Dummy data for users
let dummyUsers: User[] = [
  {
    id: "user-123",
    name: "Juan Pérez",
    email: "juan@example.com",
    // In a real app, this would be a hashed password
    // For this dummy data, we'll use a simple check in loginUser
    // passwordHash: "$2a$10$ABCDEFGH.abcdefgh1234567890123456789012345678901234567890", // Hashed 'password123'
    role: "user",
    createdAt: new Date("2023-01-01T10:00:00Z"),
    lastLogin: new Date("2023-01-01T10:00:00Z").toISOString(),
    orderCount: 0,
    totalSpent: 0,
    isActive: true,
  },
  {
    id: "admin-456",
    name: "Admin User",
    email: "admin@717store.com",
    // passwordHash: "$2a$10$ABCDEFGH.abcdefgh1234567890123456789012345678901234567890", // Hashed 'admin123'
    role: "admin",
    createdAt: new Date("2023-01-01T10:00:00Z"),
    lastLogin: new Date("2023-01-01T10:00:00Z").toISOString(),
    orderCount: 0,
    totalSpent: 0,
    isActive: true,
  },
];

// Simulate user login
export async function loginUser(email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  const user = dummyUsers.find(u => u.email === email);

  if (!user) {
    return { success: false, message: "Usuario no encontrado." };
  }

  // In a real app, compare hashed passwords using bcrypt.compare
  // const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  const isPasswordValid = (email === 'juan@example.com' && password === 'password123') ||
                          (email === 'admin@717store.com' && password === 'admin123'); // Simplified for dummy data

  if (isPasswordValid) {
    // Return user data without sensitive info like passwordHash
    return { success: true, message: "Inicio de sesión exitoso.", user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt } };
  } else {
    return { success: false, message: "Contraseña incorrecta." };
  }
}

// Simulate user registration
export async function registerUser(name: string, email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  if (dummyUsers.some(u => u.email === email)) {
    return { success: false, message: "El email ya está registrado." };
  }

  // In a real app, hash the password using bcrypt.hash
  // const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    // passwordHash: hashedPassword, // Store hashed password in real app
    role: "user",
    createdAt: new Date(),
    lastLogin: new Date().toISOString(),
    orderCount: 0,
    totalSpent: 0,
    isActive: true,
  };

  dummyUsers.push(newUser);
  console.log("New user registered:", newUser);
  return { success: true, message: "Registro exitoso.", user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, createdAt: newUser.createdAt } };
}

// Simulate admin login
export async function adminLogin(email: string, password: string): Promise<{ success: boolean; message?: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  const adminUser = dummyUsers.find(u => u.email === email && u.role === "admin");

  if (!adminUser) {
    return { success: false, message: "Credenciales de administrador inválidas." };
  }

  // In a real app, compare hashed passwords
  // const isPasswordValid = await bcrypt.compare(password, adminUser.passwordHash);
  const isPasswordValid = (email === 'admin@717store.com' && password === 'admin123'); // Simplified for dummy data

  if (isPasswordValid) {
    // In a real app, set an admin session (e.g., cookie, JWT)
    return { success: true, message: "Inicio de sesión de administrador exitoso." };
  } else {
    return { success: false, message: "Contraseña incorrecta." };
  }
}

// Simulate admin logout
export async function adminLogout(): Promise<{ success: boolean; message?: string }> {
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  // In a real app, clear the admin session
  return { success: true, message: "Sesión de administrador cerrada." };
}

// Simulate validating admin session (server-side check)
export async function validateAdminSession(): Promise<boolean> {
  // In a real app, this would check a session cookie or JWT
  // For now, we'll just simulate a logged-in state for demonstration
  await new Promise(resolve => setTimeout(resolve, 100));
  // This should be based on actual session management
  return false; // Default to false, adminLogin would set true
}

// Simulate fetching all users (for admin panel)
export async function getUsers(): Promise<User[]> {
  // In a real application, you would fetch this from a database (e.g., Supabase)
  // For now, we'll use mock data.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockUsers as User[])
    }, 500) // Simulate network delay
  })
}

// Simulate fetching a user by ID (for admin panel)
export async function getUserById(id: string): Promise<User | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === id)
      resolve(user ? (user as User) : null)
    }, 300) // Simulate network delay
  })
}

// Simulate creating a user (for admin panel)
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'orderCount' | 'totalSpent' | 'isActive'>): Promise<User | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      // Simulate checking for existing email
      if (mockUsers.some(u => u.email === userData.email)) {
        resolve(null) // Email already exists
        return
      }

      const createdUser: User = {
        id: `user${mockUsers.length + 1}`, // Simple mock ID generation
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        orderCount: 0,
        totalSpent: 0,
        isActive: true,
        ...userData,
      }
      mockUsers.push(createdUser) // Add to mock data
      resolve(createdUser)
    }, 300)
  })
}

// Simulate updating a user (for admin panel)
export async function updateUser(userId: string, updatedData: Partial<User>): Promise<{ success: boolean; message?: string }> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const index = dummyUsers.findIndex(user => user.id === userId);
  if (index > -1) {
    dummyUsers[index] = { ...dummyUsers[index], ...updatedData };
    console.log(`User ${userId} updated:`, dummyUsers[index]);
    return { success: true, message: "Usuario actualizado exitosamente." };
  }
  return { success: false, message: "Usuario no encontrado." };
}

// Simulate deleting a user (for admin panel)
export async function deleteUser(userId: string): Promise<{ success: boolean; message?: string }> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const initialLength = dummyUsers.length;
  dummyUsers = dummyUsers.filter(user => user.id !== userId);
  if (dummyUsers.length < initialLength) {
    console.log(`User ${userId} deleted.`);
    return { success: true, message: "Usuario eliminado exitosamente." };
  }
  return { success: false, message: "Usuario no encontrado." };
}

// New functions for user authentication (simplified for dummy data)
export async function verifyUserCredentials(email: string, password: string): Promise<{ success: boolean; user?: User }> {
  const user = dummyUsers.find(u => u.email === email);
  if (user && ((email === 'juan@example.com' && password === 'password123') || (email === 'admin@717store.com' && password === 'admin123'))) { // Simplified password check
    return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt } };
  }
  return { success: false };
}

export async function logoutUser(): Promise<void> {
  // In a real app, this would clear session cookies or invalidate JWTs
  console.log("User logged out (simulated).");
  // No return value needed for a void function
}
