// lib/chat-service.ts
// This file simulates an AI chat service. In a real application, you would integrate with an actual AI API.

'use server'

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { ChatMessage } from './types'; // Ensure ChatMessage type is imported

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
      text: await this.generateBotResponse(text),
      sender: 'bot',
      timestamp: new Date()
    }

    this.messages.push(botResponse)
    return botResponse
  }

  private async generateBotResponse(userInput: string): Promise<string> {
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"), // Using GPT-4o model
        prompt: `El usuario dice: "${userInput}". Responde como un asistente de soporte amigable para una tienda de streetwear llamada "717 Store". Sé conciso y útil.`,
      })
      return text
    } catch (error) {
      console.error("Error generating text with AI SDK:", error)
      return 'Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto. ¿Hay algo más en lo que pueda ayudarte?'
    }
  }

  getMessages(): ChatMessage[] {
    return [...this.messages]
  }

  clearMessages(): void {
    this.messages = []
  }
}

// Dummy function to simulate AI response
export async function generateChatResponse(userMessage: string): Promise<string> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lowerCaseMessage = userMessage.toLowerCase();

  if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('saludo')) {
    return "¡Hola! ¿En qué puedo ayudarte hoy?";
  } else if (lowerCaseMessage.includes('envío') || lowerCaseMessage.includes('entrega')) {
    return "El tiempo de envío nacional es de 3-7 días hábiles. Para envíos internacionales, puede tardar entre 7-20 días hábiles. Recibirás un número de seguimiento una vez que tu pedido sea enviado.";
  } else if (lowerCaseMessage.includes('devolución') || lowerCaseMessage.includes('cambio')) {
    return "Puedes solicitar una devolución o cambio dentro de los 30 días posteriores a la entrega, siempre que el artículo esté sin usar y con sus etiquetas originales. Visita nuestra sección de 'Envíos y Devoluciones' para más detalles.";
  } else if (lowerCaseMessage.includes('producto') || lowerCaseMessage.includes('stock')) {
    return "Puedes explorar todos nuestros productos en la sección 'Productos'. Si buscas algo específico, usa la barra de búsqueda. La disponibilidad de stock se muestra en la página de cada producto.";
  } else if (lowerCaseMessage.includes('contacto') || lowerCaseMessage.includes('hablar con alguien')) {
    return "Puedes contactarnos directamente a través de nuestro formulario en la página de 'Contacto', o enviarnos un correo a info@717store.com. También puedes llamarnos al +57 1 234 5678.";
  } else if (lowerCaseMessage.includes('gracias')) {
    return "¡De nada! Estoy aquí para ayudarte.";
  } else {
    return "Lo siento, no estoy seguro de cómo responder a eso. ¿Podrías reformular tu pregunta o intentar con algo más específico?";
  }
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

export async function getChatResponse(prompt: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
      system: 'Eres un asistente de soporte al cliente para 717 Store, una tienda de streetwear. Responde de manera amigable y útil, enfocándote en la información de la tienda. Si te preguntan algo fuera de tu conocimiento, redirige al usuario a contactar directamente a info@717store.com.',
    })
    return text
  } catch (error) {
    console.error('Error getting chat response from AI:', error)
    return 'Lo siento, no pude procesar tu solicitud en este momento. Por favor, intenta de nuevo más tarde o contáctanos directamente en info@717store.com.'
  }
}
