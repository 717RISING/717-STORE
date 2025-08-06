import { CartItem } from "./cart-context";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size: string | null;
  color: string | null;
}

export interface Order {
  id: string;
  userId: string;
  date: string; // ISO string
  status: "Pendiente" | "Procesando" | "Enviado" | "Completado" | "Cancelado";
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

// Dummy data for orders
let dummyOrders: Order[] = [
  {
    id: "ORD001",
    userId: "user-123",
    date: new Date("2023-10-26T10:00:00Z").toISOString(),
    total: 75.00,
    status: "Completado",
    items: [
      { productId: "prod-001", name: "Camiseta 'Big Dreams'", quantity: 1, price: 25.00, size: "M", color: "Negro" },
      { productId: "prod-002", name: "Sudadera 'Code Life'", quantity: 1, price: 50.00, size: "L", color: "Gris" },
    ],
    shippingAddress: "Calle Falsa 123, Bogotá, Cundinamarca, 110111, Colombia",
    paymentMethod: "credit-card",
  },
  {
    id: "ORD002",
    userId: "user-456",
    date: new Date("2023-11-15T14:30:00Z").toISOString(),
    total: 30.00,
    status: "Pendiente",
    items: [
      { productId: "prod-003", name: "Gorra 'Street Vibe'", quantity: 1, price: 30.00, size: "Única", color: "Blanco" },
    ],
    shippingAddress: "Carrera 7 #10-20, Medellín, Antioquia, 050010, Colombia",
    paymentMethod: "paypal",
  },
  {
    id: "ORD003",
    userId: "user-123",
    date: new Date("2024-01-05T09:15:00Z").toISOString(),
    total: 120.00,
    status: "Enviado",
    items: [
      { productId: "prod-004", name: "Chaqueta 'Urban Explorer'", quantity: 1, price: 120.00, size: "M", color: "Negro" },
    ],
    shippingAddress: "Calle Falsa 123, Bogotá, Cundinamarca, 110111, Colombia",
    paymentMethod: "credit-card",
  },
];

// Simulate fetching all orders
export async function getOrders(): Promise<Order[]> {
  // In a real application, this would be an API call to your backend/database
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return dummyOrders;
}

// Simulate fetching orders by user ID
export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return dummyOrders.filter(order => order.userId === userId);
}

// Simulate creating a new order
export async function createOrder(orderData: Omit<Order, 'id' | 'date'>): Promise<{ success: boolean; orderId?: string; message?: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  const newOrderId = `ORD${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
  const newOrder: Order = {
    ...orderData,
    id: newOrderId,
    date: new Date().toISOString(),
  };

  dummyOrders.push(newOrder);
  console.log("New order created:", newOrder);
  return { success: true, orderId: newOrderId, message: "Pedido creado exitosamente." };
}

// Simulate updating an order
export async function updateOrder(orderId: string, updatedData: Partial<Order>): Promise<{ success: boolean; message?: string }> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const index = dummyOrders.findIndex(order => order.id === orderId);
  if (index > -1) {
    dummyOrders[index] = { ...dummyOrders[index], ...updatedData };
    console.log(`Order ${orderId} updated:`, dummyOrders[index]);
    return { success: true, message: "Pedido actualizado exitosamente." };
  }
  return { success: false, message: "Pedido no encontrado." };
}

// Simulate deleting an order
export async function deleteOrder(orderId: string): Promise<{ success: boolean; message?: string }> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const initialLength = dummyOrders.length;
  dummyOrders = dummyOrders.filter(order => order.id !== orderId);
  if (dummyOrders.length < initialLength) {
    console.log(`Order ${orderId} deleted.`);
    return { success: true, message: "Pedido eliminado exitosamente." };
  }
  return { success: false, message: "Pedido no encontrado." };
}
