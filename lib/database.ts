import { Product } from "./products"
import { User } from "./users"
import { Order } from "./orders"

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta 'Big Dreams'",
    description: "Una camiseta de algodón suave con un diseño gráfico inspirador. Perfecta para el día a día.",
    price: 85000,
    image: "/products/camisetas/big-dreams-tshirt.png",
    category: "camisetas",
    rating: 4.5,
    reviews: 120,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#FFFFFF", "#FF0000"], // Black, White, Red
  },
  {
    id: "2",
    name: "Hoodie 'Urban Explorer'",
    description: "Hoodie oversized con capucha y bolsillo canguro. Ideal para un look urbano y relajado.",
    price: 150000,
    image: "/placeholder.svg?height=400&width=400",
    category: "hoodies",
    rating: 4.8,
    reviews: 85,
    sizes: ["M", "L", "XL"],
    colors: ["#1A1A1A", "#808080"], // Dark Grey, Grey
  },
  {
    id: "3",
    name: "Pantalón Cargo 'Street Vibe'",
    description: "Pantalón cargo resistente con múltiples bolsillos, diseñado para la comodidad y el estilo en la calle.",
    price: 120000,
    image: "/placeholder.svg?height=400&width=400",
    category: "pantalones",
    rating: 4.2,
    reviews: 60,
    sizes: ["S", "M", "L"],
    colors: ["#36454F", "#000000"], // Charcoal, Black
  },
  {
    id: "4",
    name: "Camiseta 'Oversized Tee'",
    description: "Camiseta de corte amplio para máxima comodidad y un estilo moderno. Disponible en varios colores.",
    price: 70000,
    image: "/products/camisetas/oversized-tee.png",
    category: "camisetas",
    rating: 4.6,
    reviews: 95,
    sizes: ["M", "L", "XL"],
    colors: ["#FFFFFF", "#000000", "#0000FF"], // White, Black, Blue
  },
  {
    id: "5",
    name: "Gorra '717 Logo'",
    description: "Gorra clásica con el logo bordado de 717 Store. Un accesorio esencial para tu outfit.",
    price: 45000,
    image: "/placeholder.svg?height=400&width=400",
    category: "accesorios",
    rating: 4.7,
    reviews: 200,
    sizes: ["Única"],
    colors: ["#000000", "#FF0000", "#FFFFFF"], // Black, Red, White
  },
  {
    id: "6",
    name: "Camiseta 'Graphic Tee Blood'",
    description: "Camiseta con un diseño gráfico audaz y vibrante. Hecha para destacar.",
    price: 90000,
    image: "/products/camisetas/graphic-tee-blood.png",
    category: "camisetas",
    rating: 4.4,
    reviews: 70,
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#FF0000"], // Black, Red
  },
  {
    id: "7",
    name: "Camiseta 'Graphic Tee Pain'",
    description: "Diseño único que expresa la lucha y la superación. Confeccionada para durar.",
    price: 90000,
    image: "/products/camisetas/graphic-tee-pain.png",
    category: "camisetas",
    rating: 4.3,
    reviews: 55,
    sizes: ["M", "L", "XL"],
    colors: ["#FFFFFF", "#000000"], // White, Black
  },
  {
    id: "8",
    name: "Chaqueta 'Windbreaker'",
    description: "Chaqueta cortavientos ligera y estilosa, ideal para cualquier clima urbano.",
    price: 180000,
    image: "/placeholder.svg?height=400&width=400",
    category: "chaquetas",
    rating: 4.9,
    reviews: 40,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#008000", "#0000FF"], // Black, Green, Blue
  },
]

// Mock data for users
const mockUsers: User[] = [
  {
    id: "user1",
    name: "Juan Perez",
    email: "juan.perez@example.com",
    password: "password123", // In a real app, this would be hashed
    phone: "3001234567",
    address: "Calle 10 #20-30, Bogotá",
    role: "customer",
  },
  {
    id: "user2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    password: "password123",
    phone: "3109876543",
    address: "Carrera 50 #15-25, Medellín",
    role: "customer",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@717store.com",
    password: "adminpassword", // In a real app, this would be hashed
    phone: "3201112233",
    address: "Oficina Principal, Cali",
    role: "admin",
  },
]

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ORD001",
    userId: "user1",
    date: "2024-07-20T10:00:00Z",
    status: "Completado",
    total: 235000,
    items: [
      { productId: "1", name: "Camiseta 'Big Dreams'", quantity: 1, price: 85000, size: "M", color: "#000000" },
      { productId: "5", name: "Gorra '717 Logo'", quantity: 1, price: 45000, size: "Única", color: "#FF0000" },
      { productId: "4", name: "Camiseta 'Oversized Tee'", quantity: 1, price: 70000, size: "L", color: "#FFFFFF" },
    ],
    shippingAddress: "Calle 10 #20-30, Bogotá",
    paymentMethod: "Tarjeta de Crédito",
  },
  {
    id: "ORD002",
    userId: "user2",
    date: "2024-07-22T14:30:00Z",
    status: "Pendiente",
    total: 150000,
    items: [
      { productId: "2", name: "Hoodie 'Urban Explorer'", quantity: 1, price: 150000, size: "L", color: "#1A1A1A" },
    ],
    shippingAddress: "Carrera 50 #15-25, Medellín",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD003",
    userId: "user1",
    date: "2024-07-25T09:15:00Z",
    status: "Enviado",
    total: 90000,
    items: [
      { productId: "6", name: "Camiseta 'Graphic Tee Blood'", quantity: 1, price: 90000, size: "S", color: "#FF0000" },
    ],
    shippingAddress: "Calle 10 #20-30, Bogotá",
    paymentMethod: "PSE",
  },
]

// Simulate database delays
const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Example: A simple function to format currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // For Colombian Pesos, usually no decimals
    maximumFractionDigits: 0,
  }).format(price)
}

interface MockDatabase {
  users: any[];
  products: any[];
  orders: any[];
  // Add other collections/tables as needed
}

const db: MockDatabase = {
  users: [],
  products: [],
  orders: [],
};

export async function initializeDatabase() {
  console.log("Initializing mock database...");
  // Simulate async initialization
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log("Mock database initialized.");
}

export async function getCollection(collectionName: keyof MockDatabase) {
  // Simulate async data fetching
  await new Promise(resolve => setTimeout(resolve, 50));
  return db[collectionName];
}

export async function insertIntoCollection(collectionName: keyof MockDatabase, data: any) {
  // Simulate async insertion
  await new Promise(resolve => setTimeout(resolve, 50));
  db[collectionName].push(data);
  return data;
}

export async function updateCollection(collectionName: keyof MockDatabase, id: string, updates: any) {
  // Simulate async update
  await new Promise(resolve => setTimeout(resolve, 50));
  const collection = db[collectionName];
  const index = collection.findIndex((item: any) => item.id === id);
  if (index !== -1) {
    collection[index] = { ...collection[index], ...updates };
    return collection[index];
  }
  return null;
}

export async function deleteFromCollection(collectionName: keyof MockDatabase, id: string) {
  // Simulate async deletion
  await new Promise(resolve => setTimeout(resolve, 50));
  const collection = db[collectionName];
  const initialLength = collection.length;
  db[collectionName] = collection.filter((item: any) => item.id !== id);
  return db[collectionName].length < initialLength;
}

export async function getAllProducts(): Promise<Product[]> {
  await simulateDelay(500) // Simulate network delay
  return mockProducts
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await simulateDelay(300)
  return mockProducts.find((product) => product.id === id)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await simulateDelay(400)
  // Return a subset of products as featured
  return mockProducts.filter((product) => ["1", "2", "5", "8"].includes(product.id))
}

export async function getAllUsers(): Promise<User[]> {
  await simulateDelay(500)
  return mockUsers
}

export async function getUserById(id: string): Promise<User | undefined> {
  await simulateDelay(300)
  return mockUsers.find((user) => user.id === id)
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  await simulateDelay(300)
  return mockUsers.find((user) => user.email === email)
}

export async function createUser(user: Omit<User, "id" | "role">): Promise<User> {
  await simulateDelay(500)
  const newUser: User = {
    id: `user${mockUsers.length + 1}`,
    ...user,
    role: "customer",
  }
  mockUsers.push(newUser)
  return newUser
}

export async function updateUser(updatedUser: User): Promise<User> {
  await simulateDelay(500)
  const index = mockUsers.findIndex((user) => user.id === updatedUser.id)
  if (index !== -1) {
    mockUsers[index] = updatedUser
    return updatedUser
  }
  throw new Error("User not found")
}

export async function getAllOrders(): Promise<Order[]> {
  await simulateDelay(500)
  return mockOrders
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  await simulateDelay(300)
  return mockOrders.find((order) => order.id === id)
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  await simulateDelay(300)
  return mockOrders.filter((order) => order.userId === userId)
}

export async function createOrder(order: Omit<Order, "id" | "date" | "status">): Promise<Order> {
  await simulateDelay(500)
  const newOrder: Order = {
    id: `ORD${(mockOrders.length + 1).toString().padStart(3, "0")}`,
    date: new Date().toISOString(),
    status: "Pendiente",
    ...order,
  }
  mockOrders.push(newOrder)
  return newOrder
}

export async function updateOrderStatus(orderId: string, newStatus: string): Promise<Order> {
  await simulateDelay(500)
  const order = mockOrders.find((o) => o.id === orderId)
  if (order) {
    order.status = newStatus
    return order
  }
  throw new Error("Order not found")
}
