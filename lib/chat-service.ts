// lib/chat-service.ts
// This file simulates an AI chat service. In a real application, you would integrate with an actual AI API.

'use server'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export class ChatService {
  private static instance: ChatService
  private messages: ChatMessage[] = []

  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService()
    }
    return ChatService.instance
  }

  async sendMessage(text: string): Promise<ChatMessage> {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }

    this.messages.push(userMessage)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: this.generateBotResponse(text),
      sender: 'bot',
      timestamp: new Date()
    }

    this.messages.push(botResponse)
    return botResponse
  }

  private generateBotResponse(userInput: string): string {
    const input = userInput.toLowerCase()
    
    if (input.includes('envío') || input.includes('envio')) {
      return 'Los envíos nacionales tardan entre 3-7 días hábiles. ¡Envío gratis en compras superiores a $200.000!'
    }
    if (input.includes('devolución') || input.includes('devolucion')) {
      return 'Aceptamos devoluciones dentro de 30 días. El producto debe estar sin usar y con etiquetas originales.'
    }
    if (input.includes('talla') || input.includes('size')) {
      return 'Tenemos tallas desde S hasta XXL. Puedes consultar nuestra guía de tallas en cada producto.'
    }
    if (input.includes('precio') || input.includes('costo')) {
      return 'Nuestros precios van desde $89.000. ¿Hay algún producto específico que te interese?'
    }
    
    return 'Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto. ¿Hay algo más en lo que pueda ayudarte?'
  }

  getMessages(): ChatMessage[] {
    return [...this.messages]
  }

  clearMessages(): void {
    this.messages = []
  }
}

export function getChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Productos
  if (lowerMessage.includes("producto") || lowerMessage.includes("camiseta") || lowerMessage.includes("ropa")) {
    return `🛍️ **Nuestros Productos Destacados:**

📱 **Camisetas:**
• Big Dreams T-Shirt - $45.000
• Oversized Tee - $42.000
• Graphic Tee Blood - $48.000
• Graphic Tee Pain - $48.000

👕 **Características:**
• 100% algodón premium
• Diseños exclusivos
• Tallas S, M, L, XL, XXL
• Colores variados disponibles

💫 **Ofertas actuales:**
• 2x1 en camisetas seleccionadas
• Envío gratis en compras +$80.000`
  }

  // Envíos
  if (lowerMessage.includes("envío") || lowerMessage.includes("entrega") || lowerMessage.includes("domicilio")) {
    return `🚚 **Información de Envíos:**

📍 **Cobertura Nacional:**
• Bogotá: $8.000 (1-2 días)
• Medellín: $12.000 (2-3 días)
• Cali: $12.000 (2-3 días)
• Barranquilla: $15.000 (3-4 días)
• Otras ciudades: $18.000 (4-6 días)

⚡ **Envío Express:**
• Bogotá: $15.000 (mismo día)
• Principales ciudades: $25.000 (24h)

🎁 **Envío GRATIS:**
• Compras superiores a $80.000
• Aplica para todo el país`
  }

  // Tallas
  if (lowerMessage.includes("talla") || lowerMessage.includes("medida") || lowerMessage.includes("tamaño")) {
    return `📏 **Guía de Tallas (Camisetas):**

👕 **Medidas en cm:**
• **S:** Pecho 92, Largo 68
• **M:** Pecho 97, Largo 70
• **L:** Pecho 102, Largo 72
• **XL:** Pecho 107, Largo 74
• **XXL:** Pecho 112, Largo 76

📐 **Cómo medir:**
1. Pecho: Contorno bajo las axilas
2. Largo: Desde hombro hasta borde inferior

💡 **Recomendación:**
Si estás entre dos tallas, elige la mayor para mayor comodidad.`
  }

  // Pagos
  if (lowerMessage.includes("pago") || lowerMessage.includes("pagar") || lowerMessage.includes("tarjeta")) {
    return `💳 **Métodos de Pago Disponibles:**

🏦 **Tarjetas:**
• Visa, Mastercard, American Express
• Débito y crédito
• Hasta 12 cuotas sin interés

📱 **Digitales:**
• PSE (Débito online)
• Nequi, Daviplata
• Bancolombia a la Mano

💰 **Otros:**
• Efecty, Baloto
• Consignación bancaria
• Contra entrega (+$5.000)

🔒 **100% Seguro** - Transacciones encriptadas`
  }

  // Cambios y devoluciones
  if (lowerMessage.includes("cambio") || lowerMessage.includes("devolución") || lowerMessage.includes("garantía")) {
    return `🔄 **Política de Cambios y Devoluciones:**

✅ **Condiciones:**
• 30 días calendario desde la compra
• Producto en perfecto estado
• Con etiquetas originales
• Factura de compra

📦 **Proceso:**
1. Contacta nuestro soporte
2. Envía fotos del producto
3. Te enviamos guía de devolución
4. Procesamos en 3-5 días hábiles

💸 **Reembolsos:**
• Mismo método de pago original
• Procesamiento: 5-10 días hábiles

🚚 **Costo de envío de devolución:** $12.000`
  }

  // Ofertas
  if (lowerMessage.includes("oferta") || lowerMessage.includes("descuento") || lowerMessage.includes("promoción")) {
    return `🎉 **Ofertas Especiales Activas:**

🔥 **MEGA DESCUENTOS:**
• 2x1 en camisetas seleccionadas
• 30% OFF en segunda unidad
• Combo 3 camisetas por $120.000

⚡ **FLASH SALES:**
• Descuentos hasta 40% por tiempo limitado
• Productos desde $25.000

🎁 **BENEFICIOS EXTRA:**
• Envío gratis en compras +$80.000
• Puntos de fidelidad por cada compra
• Descuento del 10% en tu cumpleaños

📱 **Código:** CHAT10 (10% descuento adicional)`
  }

  // Estado de pedido
  if (lowerMessage.includes("pedido") || lowerMessage.includes("orden") || lowerMessage.includes("estado")) {
    return `📋 **Consulta tu Pedido:**

🔍 **Para verificar el estado:**
1. Ingresa a tu cuenta en 717store.com
2. Ve a "Mis Pedidos"
3. O envíanos tu número de orden

📱 **Estados posibles:**
• ✅ Confirmado
• 📦 En preparación
• 🚚 En camino
• 🏠 Entregado

📞 **¿Necesitas ayuda?**
Envíanos tu número de orden y te ayudamos inmediatamente.`
  }

  // Contacto
  if (lowerMessage.includes("contacto") || lowerMessage.includes("soporte") || lowerMessage.includes("ayuda")) {
    return `📞 **Contacta con Nosotros:**

🕐 **Horarios de Atención:**
• Lunes a Viernes: 8:00 AM - 6:00 PM
• Sábados: 9:00 AM - 4:00 PM
• Domingos: 10:00 AM - 2:00 PM

📱 **Canales de Contacto:**
• WhatsApp: +57 300 123 4567
• Email: soporte@717store.com
• Teléfono: +57 1 234 5678

🏢 **Tienda Física:**
• Dirección: Calle 123 #45-67, Bogotá
• Centro Comercial Plaza Central, Local 234

💬 **Chat en vivo:** Disponible 24/7`
  }

  // Respuesta por defecto
  return `👋 ¡Hola! Soy tu asistente virtual de 717 Store.

🛍️ **Puedo ayudarte con:**
• Información de productos y precios
• Guía de tallas y medidas
• Métodos de pago disponibles
• Información de envíos
• Política de cambios
• Estado de pedidos
• Ofertas especiales

💬 **¿En qué específicamente te puedo ayudar hoy?**

Escribe tu pregunta o selecciona una de las opciones rápidas. 😊`
}

export function getQuickReplies(message: string): string[] {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("producto") || lowerMessage.includes("camiseta")) {
    return [
      "Ver camisetas",
      "Ver hoodies",
      "Productos en oferta",
      "Tallas disponibles",
      "Precios actuales",
      "Nuevos productos",
    ]
  }

  if (lowerMessage.includes("envío") || lowerMessage.includes("entrega")) {
    return [
      "Costo de envío",
      "Tiempos de entrega",
      "Envío express",
      "Envío gratis",
      "Cobertura nacional",
      "Rastrear pedido",
    ]
  }

  if (lowerMessage.includes("talla") || lowerMessage.includes("medida")) {
    return ["Tabla de medidas", "Cómo medir", "Talla S", "Talla M", "Talla L", "Cambio de talla"]
  }

  if (lowerMessage.includes("pago") || lowerMessage.includes("pagar")) {
    return [
      "Tarjetas aceptadas",
      "Pago PSE",
      "Pago digital",
      "Cuotas disponibles",
      "Pago contraentrega",
      "Seguridad de pago",
    ]
  }

  if (lowerMessage.includes("cambio") || lowerMessage.includes("devolución")) {
    return [
      "Política de cambios",
      "Cómo devolver",
      "Tiempo límite",
      "Estado del producto",
      "Costo devolución",
      "Reembolso",
    ]
  }

  if (lowerMessage.includes("oferta") || lowerMessage.includes("descuento")) {
    return [
      "Ofertas actuales",
      "Descuentos disponibles",
      "Código promocional",
      "2x1 camisetas",
      "Envío gratis",
      "Flash sales",
    ]
  }

  if (lowerMessage.includes("pedido") || lowerMessage.includes("orden")) {
    return [
      "Estado de pedido",
      "Rastrear envío",
      "Modificar pedido",
      "Cancelar pedido",
      "Factura electrónica",
      "Tiempo de entrega",
    ]
  }

  if (lowerMessage.includes("contacto")) {
    return ["WhatsApp", "Email soporte", "Teléfono", "Tienda física", "Horarios", "Chat en vivo"]
  }

  // Quick replies por defecto
  return [
    "Ver productos",
    "Información de envío",
    "Guía de tallas",
    "Métodos de pago",
    "Política de cambios",
    "Contactar soporte",
    "Ofertas especiales",
    "Estado de pedido",
  ]
}
