import { Order, CartItem, ShippingAddress, OrderItem } from './types'; // Ensure Order type is imported
import { mockOrders } from './mock-data' // Corrected import from mock-data

// Dummy data for orders (using mockOrders from mock-data.ts)

export async function getOrders(): Promise<Order[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockOrders;
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockOrders.find(order => order.id === id);
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockOrders.filter(order => order.userId === userId);
}

export async function createOrder(
  userId: string,
  cartItems: CartItem[],
  shippingAddress: ShippingAddress,
  totalAmount: number
): Promise<string> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newOrderId = `ORD${(mockOrders.length + 1).toString().padStart(3, '0')}`;
  const newOrder: Order = {
    id: newOrderId,
    userId,
    createdAt: new Date().toISOString(), // Use createdAt
    updatedAt: new Date().toISOString(), // Use updatedAt
    status: 'Pendiente', // Default status
    total: totalAmount, // Use total
    shippingAddress,
    paymentMethod: 'Tarjeta de Crédito', // Default payment method
    items: cartItems.map(item => ({ // Map CartItem to OrderItem
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
      size: item.selectedSize,
      color: item.selectedColor,
    })),
  };
  mockOrders.push(newOrder); // Add to mock data
  console.log('New order created:', newOrder);
  return newOrderId;
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<{ success: boolean; message?: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockOrders.findIndex(order => order.id === id);
  if (index !== -1) {
    mockOrders[index] = {
      ...mockOrders[index],
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
  const initialLength = mockOrders.length;
  const newOrders = mockOrders.filter(order => order.id !== id);
  if (newOrders.length < initialLength) {
    // Update the mockOrders array in place (or reassign if it's `let`)
    mockOrders.splice(0, mockOrders.length, ...newOrders); // This modifies the original array
    console.log(`Order ${id} deleted.`);
    return { success: true, message: "Pedido eliminado exitosamente." };
  }
  return { success: false, message: "Pedido no encontrado." };
}
