import { Order } from './types'; // Ensure Order type is imported
import { mockOrders } from '@/scripts/setup-database' // Assuming mockOrders is exported from setup-database.js

// Dummy data for orders
let dummyOrders: Order[] = [
  {
    id: "ORD78901",
    userId: "user-123",
    items: [
      { productId: "prod-1", name: "Camiseta 'Big Dreams'", quantity: 1, price: 29.99, size: "M", color: "Negro" },
      { productId: "prod-8", name: "Gorra '717 Original'", quantity: 1, price: 19.99, size: "Única", color: "Negro" },
    ],
    shippingAddress: {
      fullName: "Juan Pérez",
      address: "Calle Falsa 123",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      country: "USA",
      email: "juan@example.com",
      phone: "555-123-4567",
    },
    paymentDetails: {
      cardNumber: "************4242",
      cardName: "Juan Pérez",
      expiryDate: "12/25",
      cvv: "***",
    },
    total: 49.98,
    status: "delivered",
    createdAt: "2023-10-20T10:00:00Z",
    updatedAt: "2023-10-25T15:00:00Z",
  },
  {
    id: "ORD78902",
    userId: "user-123",
    items: [
      { productId: "prod-2", name: "Oversized Tee 'Urban Flow'", quantity: 2, price: 34.99, size: "L", color: "Verde Oliva" },
    ],
    shippingAddress: {
      fullName: "Juan Pérez",
      address: "Calle Falsa 123",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      country: "USA",
      email: "juan@example.com",
      phone: "555-123-4567",
    },
    paymentDetails: {
      cardNumber: "************1234",
      cardName: "Juan Pérez",
      expiryDate: "08/24",
      cvv: "***",
    },
    total: 69.98,
    status: "shipped",
    createdAt: "2023-10-22T11:30:00Z",
    updatedAt: "2023-10-24T09:00:00Z",
  },
  {
    id: "ORD78903",
    userId: "guest-user-123",
    items: [
      { productId: "prod-5", name: "Sudadera con Capucha 'Night City'", quantity: 1, price: 59.99, size: "M", color: "Negro" },
    ],
    shippingAddress: {
      fullName: "Invitado Cliente",
      address: "Avenida Siempre Viva 742",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      country: "USA",
      email: "guest@example.com",
      phone: "555-987-6543",
    },
    paymentDetails: {
      cardNumber: "************5678",
      cardName: "Invitado Cliente",
      expiryDate: "06/26",
      cvv: "***",
    },
    total: 59.99,
    status: "pending",
    createdAt: "2023-10-26T14:00:00Z",
    updatedAt: "2023-10-26T14:00:00Z",
  },
];

export async function getOrders(): Promise<Order[]> {
  // In a real application, you would fetch this from a database (e.g., Supabase)
  // For now, we'll use mock data.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockOrders as Order[])
    }, 500) // Simulate network delay
  })
}

export async function getOrderById(id: string): Promise<Order | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      const order = mockOrders.find(o => o.id === id)
      resolve(order ? (order as Order) : null)
    }, 300) // Simulate network delay
  })
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyOrders.filter(order => order.userId === userId);
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; message?: string; orderId?: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newOrder: Order = {
    id: `ORD${Date.now()}`,
    ...order,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dummyOrders.push(newOrder);
  console.log("New order created:", newOrder);
  return { success: true, message: "Pedido creado exitosamente.", orderId: newOrder.id };
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<{ success: boolean; message?: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = dummyOrders.findIndex(order => order.id === id);
  if (index !== -1) {
    dummyOrders[index] = {
      ...dummyOrders[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return { success: true, message: "Pedido actualizado exitosamente." };
  }
  return { success: false, message: "Pedido no encontrado." };
}

export async function deleteOrder(id: string): Promise<{ success: boolean; message?: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const initialLength = dummyOrders.length;
  dummyOrders = dummyOrders.filter(order => order.id !== id);
  if (dummyOrders.length < initialLength) {
    console.log(`Order ${id} deleted.`);
    return { success: true, message: "Pedido eliminado exitosamente." };
  }
  return { success: false, message: "Pedido no encontrado." };
}
