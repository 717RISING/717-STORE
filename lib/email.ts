// This is a mock email service for demonstration purposes.
// In a real application, you would integrate with a service like SendGrid, Nodemailer, etc.

interface OrderDetails {
  orderId: string;
  customerEmail: string;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  shippingAddress: {
    address: string;
    city: string;
    zip: string;
    country: string;
  };
}

export async function sendOrderConfirmationToCustomer(orderDetails: OrderDetails): Promise<boolean> {
  console.log(`Sending order confirmation to ${orderDetails.customerEmail}`);
  console.log(`Order ID: ${orderDetails.orderId}`);
  console.log(`Total: $${orderDetails.total.toFixed(2)}`);
  console.log('Items:', orderDetails.items);
  console.log('Shipping Address:', orderDetails.shippingAddress);

  // Simulate email sending delay
  return new Promise(resolve => setTimeout(() => {
    console.log('Order confirmation email sent successfully (mock)!');
    resolve(true);
  }, 1000));
}

export async function sendCorporateOrderNotification(orderDetails: OrderDetails): Promise<boolean> {
  console.log(`Sending corporate notification for order ${orderDetails.orderId}`);
  console.log(`Customer Email: ${orderDetails.customerEmail}`);
  console.log(`Total: $${orderDetails.total.toFixed(2)}`);
  // Simulate email sending delay
  return new Promise(resolve => setTimeout(() => {
    console.log('Corporate order notification sent successfully (mock)!');
    resolve(true);
  }, 500));
}
