import type { Order } from "./orders"

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface EmailService {
  sendEmail(to: string, template: EmailTemplate): Promise<boolean>
}

// Simulación del servicio de email
class MockEmailService implements EmailService {
  async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    // Simular delay de envío
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(`📧 Email enviado a: ${to}`)
    console.log(`📋 Asunto: ${template.subject}`)
    console.log(`📄 Contenido: ${template.text}`)

    // Simular éxito del 95%
    return Math.random() > 0.05
  }
}

// Instancia del servicio de email
export const emailService = new MockEmailService()

// Función para generar template de confirmación de pedido
export function generateOrderConfirmationTemplate(order: Order): EmailTemplate {
  const itemsList = order.items
    .map(
      (item) =>
        `• ${item.name} (Talla: ${item.size}) - Cantidad: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
    )
    .join("\n")

  const subject = `Confirmación de Pedido #${order.id} - 717 Store`

  const text = `
¡Hola ${order.shipping.firstName}!

Gracias por tu compra en 717 Store. Hemos recibido tu pedido y está siendo procesado.

DETALLES DEL PEDIDO:
Número de pedido: ${order.id}
Fecha: ${new Date(order.createdAt).toLocaleDateString("es-ES")}

PRODUCTOS:
${itemsList}

RESUMEN:
Subtotal: $${order.subtotal.toFixed(2)}
Envío: $${order.shipping.toFixed(2)}
Impuestos: $${order.tax.toFixed(2)}
Total: $${order.total.toFixed(2)}

DIRECCIÓN DE ENVÍO:
${order.shipping.firstName} ${order.shipping.lastName}
${order.shipping.address}
${order.shipping.city}, ${order.shipping.state} ${order.shipping.zipCode}
${order.shipping.country}

MÉTODO DE PAGO:
${
  order.payment.method === "card"
    ? "Tarjeta de Crédito"
    : order.payment.method === "paypal"
      ? "PayPal"
      : "Transferencia Bancaria"
}

Tu pedido será procesado en las próximas 24 horas. Te enviaremos otra notificación cuando tu pedido sea enviado con el número de seguimiento.

¡Gracias por elegir 717 Store!

Equipo 717 Store
`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: white; padding: 20px; text-align: center; }
    .logo { font-size: 24px; font-weight: bold; color: #5D1A1D; }
    .content { padding: 20px; background: #f9f9f9; }
    .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .total { font-weight: bold; font-size: 18px; color: #5D1A1D; }
    .footer { text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">717 STORE</div>
      <h1>¡Confirmación de Pedido!</h1>
    </div>
    
    <div class="content">
      <h2>¡Hola ${order.shipping.firstName}!</h2>
      <p>Gracias por tu compra en 717 Store. Hemos recibido tu pedido y está siendo procesado.</p>
      
      <div class="order-details">
        <h3>Detalles del Pedido</h3>
        <p><strong>Número de pedido:</strong> ${order.id}</p>
        <p><strong>Fecha:</strong> ${new Date(order.createdAt).toLocaleDateString("es-ES")}</p>
        
        <h4>Productos:</h4>
        <ul>
          ${order.items
            .map(
              (item) => `
            <li>${item.name} (Talla: ${item.size}) - Cantidad: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>
          `,
            )
            .join("")}
        </ul>
        
        <h4>Resumen:</h4>
        <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
        <p>Envío: $${order.shipping.toFixed(2)}</p>
        <p>Impuestos: $${order.tax.toFixed(2)}</p>
        <p class="total">Total: $${order.total.toFixed(2)}</p>
      </div>
      
      <div class="order-details">
        <h3>Dirección de Envío</h3>
        <p>
          ${order.shipping.firstName} ${order.shipping.lastName}<br>
          ${order.shipping.address}<br>
          ${order.shipping.city}, ${order.shipping.state} ${order.shipping.zipCode}<br>
          ${order.shipping.country}
        </p>
      </div>
      
      <p>Tu pedido será procesado en las próximas 24 horas. Te enviaremos otra notificación cuando tu pedido sea enviado con el número de seguimiento.</p>
    </div>
    
    <div class="footer">
      <p>¡Gracias por elegir 717 Store!</p>
      <p>Equipo 717 Store</p>
    </div>
  </div>
</body>
</html>
`

  return { subject, text, html }
}

// Función para generar template de envío
export function generateShippingNotificationTemplate(order: Order): EmailTemplate {
  const subject = `Tu pedido #${order.id} ha sido enviado - 717 Store`

  const text = `
¡Hola ${order.shipping.firstName}!

¡Buenas noticias! Tu pedido #${order.id} ha sido enviado y está en camino.

INFORMACIÓN DE ENVÍO:
Número de seguimiento: ${order.trackingNumber}
Transportista: 717 Express
Tiempo estimado de entrega: 3-5 días hábiles

Puedes rastrear tu pedido en: https://717store.com/seguimiento/${order.trackingNumber}

¡Gracias por tu compra!

Equipo 717 Store
`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: white; padding: 20px; text-align: center; }
    .logo { font-size: 24px; font-weight: bold; color: #5D1A1D; }
    .content { padding: 20px; background: #f9f9f9; }
    .tracking { background: #5D1A1D; color: white; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0; }
    .tracking-number { font-size: 20px; font-weight: bold; }
    .footer { text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">717 STORE</div>
      <h1>¡Tu pedido está en camino! 📦</h1>
    </div>
    
    <div class="content">
      <h2>¡Hola ${order.shipping.firstName}!</h2>
      <p>¡Buenas noticias! Tu pedido #${order.id} ha sido enviado y está en camino.</p>
      
      <div class="tracking">
        <p>Número de seguimiento:</p>
        <div class="tracking-number">${order.trackingNumber}</div>
        <p>Transportista: 717 Express</p>
        <p>Tiempo estimado: 3-5 días hábiles</p>
      </div>
      
      <p>Puedes rastrear tu pedido en cualquier momento visitando nuestra página de seguimiento.</p>
    </div>
    
    <div class="footer">
      <p>¡Gracias por tu compra!</p>
      <p>Equipo 717 Store</p>
    </div>
  </div>
</body>
</html>
`

  return { subject, text, html }
}

// Función para generar template de entrega
export function generateDeliveryNotificationTemplate(order: Order): EmailTemplate {
  const subject = `Tu pedido #${order.id} ha sido entregado - 717 Store`

  const text = `
¡Hola ${order.shipping.firstName}!

¡Excelente! Tu pedido #${order.id} ha sido entregado exitosamente.

Esperamos que disfrutes tus nuevos productos de 717 Store.

Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.

¡Gracias por elegir 717 Store!

Equipo 717 Store
`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: white; padding: 20px; text-align: center; }
    .logo { font-size: 24px; font-weight: bold; color: #5D1A1D; }
    .content { padding: 20px; background: #f9f9f9; text-align: center; }
    .success { background: #4CAF50; color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">717 STORE</div>
      <h1>¡Pedido Entregado! ✅</h1>
    </div>
    
    <div class="content">
      <div class="success">
        <h2>¡Tu pedido #${order.id} ha sido entregado!</h2>
        <p>Esperamos que disfrutes tus nuevos productos</p>
      </div>
      
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
    </div>
    
    <div class="footer">
      <p>¡Gracias por elegir 717 Store!</p>
      <p>Equipo 717 Store</p>
    </div>
  </div>
</body>
</html>
`

  return { subject, text, html }
}

// Funciones principales para enviar notificaciones
export async function sendOrderConfirmation(order: Order): Promise<boolean> {
  const template = generateOrderConfirmationTemplate(order)
  return await emailService.sendEmail(order.shipping.email, template)
}

export async function sendShippingNotification(order: Order): Promise<boolean> {
  const template = generateShippingNotificationTemplate(order)
  return await emailService.sendEmail(order.shipping.email, template)
}

export async function sendDeliveryNotification(order: Order): Promise<boolean> {
  const template = generateDeliveryNotificationTemplate(order)
  return await emailService.sendEmail(order.shipping.email, template)
}

// Exportar las funciones con los nombres exactos que se esperan
export const sendOrderConfirmationEmail = sendOrderConfirmation
export const sendShippingNotificationEmail = sendShippingNotification
export const sendDeliveryConfirmationEmail = sendDeliveryNotification
