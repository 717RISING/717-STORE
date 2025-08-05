import nodemailer from "nodemailer"
import type { Order, OrderItem } from "./database"

// Configuración del transportador de correo (usando un mock para desarrollo)
// En producción, usarías tus credenciales SMTP reales
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email", // Ejemplo para desarrollo
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "user@example.com", // Tu usuario SMTP
    pass: process.env.SMTP_PASS || "password", // Tu contraseña SMTP
  },
})

const CORPORATE_EMAIL = process.env.EMAIL_FROM || "717days@gmail.com"

interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// Helper para formatear precios
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Genera el template HTML para la confirmación de pedido al cliente
export function generateOrderConfirmationTemplate(order: Order): EmailTemplate {
  const itemsHtml = order.items
    .map(
      (item: OrderItem) => `
    <div style="display: flex; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
      <img src="${item.imageUrl}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 15px;">
      <div style="flex-grow: 1;">
        <p style="margin: 0; font-weight: bold; color: #333;">${item.name}</p>
        <p style="margin: 0; font-size: 12px; color: #666;">Talla: ${item.size || "N/A"} | Cantidad: ${item.quantity}</p>
      </div>
      <p style="margin: 0; font-weight: bold; color: #333;">${formatPrice(item.price * item.quantity)}</p>
    </div>
  `,
    )
    .join("")

  const shippingInfoHtml = `
    <p style="margin: 0; color: #555;"><strong>Nombre:</strong> ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}</p>
    <p style="margin: 0; color: #555;"><strong>Dirección:</strong> ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.zipCode}, ${order.shippingInfo.country}</p>
    <p style="margin: 0; color: #555;"><strong>Teléfono:</strong> ${order.shippingInfo.phone}</p>
    <p style="margin: 0; color: #555;"><strong>Email:</strong> ${order.shippingInfo.email}</p>
  `

  const subject = `Confirmación de tu pedido #${order.id} en 717 Store`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4A1518; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">¡Gracias por tu compra en 717 Store!</h1>
        <p style="font-size: 14px;">Tu pedido #${order.id} ha sido confirmado.</p>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #4A1518; border-bottom: 1px solid #eee; padding-bottom: 10px;">Detalles del Pedido</h2>
        ${itemsHtml}
        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
          <p style="display: flex; justify-content: space-between; margin: 5px 0; color: #333;"><span>Subtotal:</span> <span>${formatPrice(order.totalAmount - order.shippingInfo.cost)}</span></p>
          <p style="display: flex; justify-content: space-between; margin: 5px 0; color: #333;"><span>Envío:</span> <span>${formatPrice(order.shippingInfo.cost)}</span></p>
          <p style="display: flex; justify-content: space-between; margin: 5px 0; font-weight: bold; color: #4A1518; font-size: 18px;"><span>Total:</span> <span>${formatPrice(order.totalAmount)}</span></p>
        </div>
        <h2 style="color: #4A1518; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Información de Envío</h2>
        ${shippingInfoHtml}
        <p style="margin-top: 20px; font-size: 14px; color: #666;">Te notificaremos cuando tu pedido sea enviado.</p>
      </div>
      <div style="background-color: #eee; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; ${new Date().getFullYear()} 717 Store. Todos los derechos reservados.</p>
        <p>Si tienes alguna pregunta, contáctanos en <a href="mailto:${CORPORATE_EMAIL}" style="color: #4A1518; text-decoration: none;">${CORPORATE_EMAIL}</a></p>
      </div>
    </div>
  `
  const text = `
    ¡Gracias por tu compra en 717 Store!
    Tu pedido #${order.id} ha sido confirmado.

    Detalles del Pedido:
    ${order.items.map((item: OrderItem) => `- ${item.name} (Talla: ${item.size || "N/A"}, Cantidad: ${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join("\n")}

    Subtotal: ${formatPrice(order.totalAmount - order.shippingInfo.cost)}
    Envío: ${formatPrice(order.shippingInfo.cost)}
    Total: ${formatPrice(order.totalAmount)}

    Información de Envío:
    Nombre: ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}
    Dirección: ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.zipCode}, ${order.shippingInfo.country}
    Teléfono: ${order.shippingInfo.phone}
    Email: ${order.shippingInfo.email}

    Te notificaremos cuando tu pedido sea enviado.
    © ${new Date().getFullYear()} 717 Store. Todos los derechos reservados.
    Si tienes alguna pregunta, contáctanos en ${CORPORATE_EMAIL}
  `
  return { subject, html, text }
}

// Genera el template HTML para la notificación de nuevo pedido al correo corporativo
export function generateCorporateOrderNotificationTemplate(order: Order): EmailTemplate {
  const itemsHtml = order.items
    .map(
      (item: OrderItem) => `
    <li>
      <strong>${item.name}</strong> (ID: ${item.productId}) - Talla: ${item.size || "N/A"}, Cantidad: ${item.quantity}, Precio Unitario: ${formatPrice(item.price)}
    </li>
  `,
    )
    .join("")

  const subject = `NUEVO PEDIDO RECIBIDO: #${order.id} de ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #5D1A1D; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">¡Nuevo Pedido en 717 Store!</h1>
        <p style="font-size: 16px;">Se ha realizado un nuevo pedido en tu tienda.</p>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #5D1A1D; border-bottom: 1px solid #eee; padding-bottom: 10px;">Detalles del Pedido #${order.id}</h2>
        <p style="margin: 5px 0;"><strong>Fecha del Pedido:</strong> ${order.orderDate.toLocaleString("es-CO")}</p>
        <p style="margin: 5px 0;"><strong>Estado del Pago:</strong> <span style="color: ${order.paymentStatus === "paid" ? "green" : "orange"}; font-weight: bold;">${order.paymentStatus.toUpperCase()}</span></p>
        
        <h3 style="color: #4A1518; margin-top: 20px;">Información del Cliente:</h3>
        <p style="margin: 5px 0;"><strong>Nombre:</strong> ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${order.shippingInfo.email}</p>
        <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${order.shippingInfo.phone}</p>

        <h3 style="color: #4A1518; margin-top: 20px;">Dirección de Envío:</h3>
        <p style="margin: 5px 0;">${order.shippingInfo.address}</p>
        <p style="margin: 5px 0;">${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.zipCode}</p>
        <p style="margin: 5px 0;">${order.shippingInfo.country}</p>

        <h3 style="color: #4A1518; margin-top: 20px;">Artículos del Pedido:</h3>
        <ul style="list-style: none; padding: 0;">
          ${itemsHtml}
        </ul>

        <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
          <p style="display: flex; justify-content: space-between; margin: 5px 0; color: #333;"><span>Subtotal:</span> <span>${formatPrice(order.totalAmount - order.shippingInfo.cost)}</span></p>
          <p style="display: flex; justify-content: space-between; margin: 5px 0; color: #333;"><span>Costo de Envío:</span> <span>${formatPrice(order.shippingInfo.cost)}</span></p>
          <p style="display: flex; justify-content: space-between; margin: 5px 0; font-weight: bold; color: #5D1A1D; font-size: 18px;"><span>Total del Pedido:</span> <span>${formatPrice(order.totalAmount)}</span></p>
        </div>
      </div>
      <div style="background-color: #eee; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>Este es un correo de notificación automática. Por favor, no respondas a este email.</p>
        <p>&copy; ${new Date().getFullYear()} 717 Store. Todos los derechos reservados.</p>
      </div>
    </div>
  `
  const text = `
    NUEVO PEDIDO EN 717 STORE: #${order.id}

    Se ha realizado un nuevo pedido en tu tienda.

    Detalles del Pedido #${order.id}:
    Fecha del Pedido: ${order.orderDate.toLocaleString("es-CO")}
    Estado del Pago: ${order.paymentStatus.toUpperCase()}

    Información del Cliente:
    Nombre: ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}
    Email: ${order.shippingInfo.email}
    Teléfono: ${order.shippingInfo.phone}

    Dirección de Envío:
    ${order.shippingInfo.address}
    ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.zipCode}
    ${order.shippingInfo.country}

    Artículos del Pedido:
    ${order.items.map((item: OrderItem) => `- ${item.name} (ID: ${item.productId}) - Talla: ${item.size || "N/A"}, Cantidad: ${item.quantity}, Precio Unitario: ${formatPrice(item.price)}`).join("\n")}

    Subtotal: ${formatPrice(order.totalAmount - order.shippingInfo.cost)}
    Costo de Envío: ${formatPrice(order.shippingInfo.cost)}
    Total del Pedido: ${formatPrice(order.totalAmount)}

    Este es un correo de notificación automática.
  `
  return { subject, html, text }
}

// Función para enviar correo de confirmación al cliente
export async function sendOrderConfirmationToCustomer(order: Order) {
  const { subject, html, text } = generateOrderConfirmationTemplate(order)
  try {
    await transporter.sendMail({
      from: CORPORATE_EMAIL, // Remitente
      to: order.customerEmail, // Destinatario (cliente)
      subject: subject,
      html: html,
      text: text,
    })
    console.log(`Correo de confirmación enviado a: ${order.customerEmail}`)
  } catch (error) {
    console.error(`Error al enviar correo de confirmación a ${order.customerEmail}:`, error)
  }
}

// Función para enviar notificación de nuevo pedido al correo corporativo
export async function sendCorporateOrderNotification(order: Order) {
  const { subject, html, text } = generateCorporateOrderNotificationTemplate(order)
  try {
    await transporter.sendMail({
      from: CORPORATE_EMAIL, // Remitente
      to: CORPORATE_EMAIL, // Destinatario (correo corporativo)
      subject: subject,
      html: html,
      text: text,
    })
    console.log(`Notificación de nuevo pedido enviada a: ${CORPORATE_EMAIL}`)
  } catch (error) {
    console.error(`Error al enviar notificación de nuevo pedido a ${CORPORATE_EMAIL}:`, error)
  }
}
