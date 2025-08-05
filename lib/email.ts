// lib/email.ts
// Este archivo contiene la lógica para el envío de correos electrónicos.
// Utiliza Nodemailer para simular el envío a través de SMTP.

import nodemailer from "nodemailer"
import type { Order } from "./database"

// Configuración del transportador de Nodemailer
// Asegúrate de que estas variables de entorno estén configuradas en tu .env.local o en Vercel
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const EMAIL_FROM = process.env.EMAIL_FROM || "717 Store <no-reply@717store.com>"
const CORPORATE_EMAIL = "717days@gmail.com" // Correo corporativo fijo

// --- Generación de Templates de Correo ---

function generateOrderConfirmationTemplate(order: Order): { subject: string; html: string } {
  const itemsHtml = order.items
    .map(
      (item) => `
    <li style="padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center;">
        <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 10px;">
        <div>
          <p style="margin: 0; font-weight: bold; color: #333;">${item.name}</p>
          <p style="margin: 0; font-size: 12px; color: #666;">Cantidad: ${item.quantity} ${item.size ? `| Talla: ${item.size}` : ""}</p>
        </div>
      </div>
      <span style="font-weight: bold; color: #333;">$${item.price.toLocaleString()}</span>
    </li>
  `,
    )
    .join("")

  return {
    subject: `Confirmación de Pedido #${order.id} - 717 Store`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.imgur.com/your-logo.png" alt="717 Store Logo" style="max-width: 150px; margin-bottom: 10px;">
          <h1 style="color: #5D1A1D;">¡Gracias por tu compra!</h1>
        </div>
        <p>Hola ${order.customerName || order.customerEmail},</p>
        <p>Tu pedido <strong>#${order.id}</strong> ha sido confirmado y está siendo procesado. Te notificaremos cuando sea enviado.</p>
        
        <h2 style="color: #5D1A1D; border-bottom: 1px solid #eee; padding-bottom: 10px;">Resumen del Pedido</h2>
        <ul style="list-style: none; padding: 0;">
          ${itemsHtml}
        </ul>
        
        <div style="border-top: 1px solid #eee; padding-top: 10px; margin-top: 20px;">
          <p style="display: flex; justify-content: space-between; font-weight: bold;"><span>Subtotal:</span><span>$${(order.totalAmount - order.shippingInfo.cost).toLocaleString()}</span></p>
          <p style="display: flex; justify-content: space-between; font-weight: bold;"><span>Envío:</span><span>$${order.shippingInfo.cost.toLocaleString()}</span></p>
          <p style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2em; color: #5D1A1D;"><span>Total:</span><span>$${order.totalAmount.toLocaleString()}</span></p>
        </div>

        <h2 style="color: #5D1A1D; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Información de Envío</h2>
        <p><strong>Nombre:</strong> ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}</p>
        <p><strong>Dirección:</strong> ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.zipCode}, ${order.shippingInfo.country}</p>
        <p><strong>Teléfono:</strong> ${order.shippingInfo.phone}</p>
        <p><strong>Email:</strong> ${order.shippingInfo.email}</p>

        <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
          Si tienes alguna pregunta, por favor contáctanos en <a href="mailto:${CORPORATE_EMAIL}" style="color: #5D1A1D; text-decoration: none;">${CORPORATE_EMAIL}</a>.
        </p>
        <p style="text-align: center; font-size: 12px; color: #999;">
          &copy; ${new Date().getFullYear()} 717 Store. Todos los derechos reservados.
        </p>
      </div>
    `,
  }
}

function generateCorporateOrderNotificationTemplate(order: Order): { subject: string; html: string } {
  const itemsHtml = order.items
    .map(
      (item) => `
    <li style="padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
      <span>${item.name} (${item.size || "N/A"}) x ${item.quantity}</span>
      <span>$${item.price.toLocaleString()}</span>
    </li>
  `,
    )
    .join("")

  return {
    subject: `NUEVO PEDIDO #${order.id} - 717 Store`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #5D1A1D;">¡Nuevo Pedido Recibido!</h1>
          <p style="font-size: 14px; color: #666;">Se ha realizado un nuevo pedido en tu tienda 717 Store.</p>
        </div>
        
        <p><strong>ID del Pedido:</strong> <span style="color: #5D1A1D; font-weight: bold;">#${order.id}</span></p>
        <p><strong>Fecha del Pedido:</strong> ${order.orderDate.toLocaleDateString()} ${order.orderDate.toLocaleTimeString()}</p>
        <p><strong>Estado de Pago:</strong> <span style="color: ${order.paymentStatus === "paid" ? "#28a745" : "#dc3545"}; font-weight: bold;">${order.paymentStatus.toUpperCase()}</span></p>
        
        <h2 style="color: #5D1A1D; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Detalles del Cliente</h2>
        <p><strong>Nombre:</strong> ${order.customerName || "N/A"}</p>
        <p><strong>Email:</strong> ${order.customerEmail}</p>
        <p><strong>Teléfono:</strong> ${order.shippingInfo.phone}</p>

        <h2 style="color: #5D1A1D; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Productos del Pedido</h2>
        <ul style="list-style: none; padding: 0;">
          ${itemsHtml}
        </ul>
        
        <div style="border-top: 1px solid #eee; padding-top: 10px; margin-top: 20px;">
          <p style="display: flex; justify-content: space-between; font-weight: bold;"><span>Subtotal:</span><span>$${(order.totalAmount - order.shippingInfo.cost).toLocaleString()}</span></p>
          <p style="display: flex; justify-content: space-between; font-weight: bold;"><span>Envío:</span><span>$${order.shippingInfo.cost.toLocaleString()}</span></p>
          <p style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2em; color: #5D1A1D;"><span>Total del Pedido:</span><span>$${order.totalAmount.toLocaleString()}</span></p>
        </div>

        <h2 style="color: #5D1A1D; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 20px;">Dirección de Envío</h2>
        <p>${order.shippingInfo.firstName} ${order.shippingInfo.lastName}</p>
        <p>${order.shippingInfo.address}</p>
        <p>${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.zipCode}</p>
        <p>${order.shippingInfo.country}</p>

        <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
          Este es un correo de notificación automática. Por favor, no respondas a este mensaje.
        </p>
      </div>
    `,
  }
}

// --- Funciones de Envío de Correo ---

export async function sendCorporateOrderNotification(order: Order): Promise<boolean> {
  try {
    const { subject, html } = generateCorporateOrderNotificationTemplate(order)
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: CORPORATE_EMAIL,
      subject: subject,
      html: html,
    })
    console.log(`Notificación de pedido #${order.id} enviada a ${CORPORATE_EMAIL}`)
    return true
  } catch (error) {
    console.error(`Error al enviar notificación corporativa para el pedido #${order.id}:`, error)
    return false
  }
}

export async function sendOrderConfirmationToCustomer(order: Order): Promise<boolean> {
  try {
    const { subject, html } = generateOrderConfirmationTemplate(order)
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: order.customerEmail,
      subject: subject,
      html: html,
    })
    console.log(`Confirmación de pedido #${order.id} enviada a ${order.customerEmail}`)
    return true
  } catch (error) {
    console.error(`Error al enviar confirmación al cliente para el pedido #${order.id}:`, error)
    return false
  }
}
