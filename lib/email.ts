interface Order {
  id: string
  customerEmail: string
  customerName: string
  totalAmount: number
  items: Array<{ name: string; quantity: number; price: number }>
  shippingAddress: { street: string; city: string; zip: string; country: string }
}

export async function sendOrderConfirmationToCustomer(order: Order) {
  console.log(`Simulating email to customer: ${order.customerEmail}`)
  console.log(`Subject: Confirmación de Pedido #${order.id} - 717 Store`)
  console.log(`
    Hola ${order.customerName},

    Gracias por tu compra en 717 Store. Tu pedido #${order.id} ha sido recibido y está siendo procesado.

    Detalles del Pedido:
    ${order.items.map(item => `- ${item.name} (x${item.quantity}) - $${item.price.toLocaleString('es-CO')} COP`).join('\n')}

    Total: $${order.totalAmount.toLocaleString('es-CO')} COP

    Dirección de Envío:
    ${order.shippingAddress.street}
    ${order.shippingAddress.city}, ${order.shippingAddress.zip}
    ${order.shippingAddress.country}

    Te notificaremos cuando tu pedido sea enviado.

    Saludos,
    El equipo de 717 Store
  `)
  // In a real application, you would use an email service like Nodemailer, SendGrid, Resend, etc.
  // Example with Nodemailer (conceptual):
  /*
  import nodemailer from 'nodemailer';
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: order.customerEmail,
    subject: `Confirmación de Pedido #${order.id} - 717 Store`,
    html: `<p>...</p>`, // HTML content for the email
  });
  */
}

export async function sendCorporateOrderNotification(order: Order) {
  console.log(`Simulating corporate notification for order: ${order.id}`)
  console.log(`Subject: Nuevo Pedido Recibido #${order.id}`)
  console.log(`
    Se ha recibido un nuevo pedido en 717 Store.

    ID del Pedido: ${order.id}
    Cliente: ${order.customerName} (${order.customerEmail})
    Total: $${order.totalAmount.toLocaleString('es-CO')} COP

    Artículos:
    ${order.items.map(item => `- ${item.name} (x${item.quantity})`).join('\n')}

    Por favor, procesa este pedido.
  `)
  // In a real application, this would send an email to an internal team or trigger a webhook.
}
