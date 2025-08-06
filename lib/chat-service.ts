// lib/chat-service.ts
// This file simulates an AI chat service. In a real application, you would integrate with an actual AI API.

'use server'

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { ChatMessage, ChatSession } from './types'; // Ensure ChatMessage and ChatSession types are imported
import { v4 as uuidv4 } from 'uuid'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot' | 'agent'
  timestamp: Date
}

interface ChatSession {
  id: string
  userId: string
  messages: ChatMessage[]
  status: 'open' | 'closed'
  createdAt: Date
  updatedAt: Date
}

export class ChatService {
  private static instance: ChatService
  private sessions: ChatSession[] = []

  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService()
    }
    return ChatService.instance
  }

  async sendMessage(sessionId: string, text: string): Promise<ChatMessage | undefined> {
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    }

    const session = await this.getSession(sessionId)
    if (session) {
      session.messages.push(userMessage)
      session.updatedAt = new Date()

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const botResponse: ChatMessage = {
        id: uuidv4(),
        text: await this.generateBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      }

      session.messages.push(botResponse)
      return botResponse
    }

    return undefined
  }

  private async generateBotResponse(userInput: string): Promise<string> {
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"), // Using GPT-4o model
        prompt: `You are a helpful assistant for a clothing store called 717 Store. Answer questions about products, shipping, returns, and general store information. Keep your answers concise and helpful.
        
        User: ${userInput}`,
      })
      return text
    } catch (error) {
      console.error("Error generating text with AI SDK:", error)
      return 'Lo siento, no pude generar una respuesta en este momento. Por favor, inténtalo de nuevo más tarde.'
    }
  }

  async getSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.sessions.find(s => s.id === sessionId)
  }

  async createSession(userId: string): Promise<ChatSession> {
    const sessionId = uuidv4()
    const newSession: ChatSession = {
      id: sessionId,
      userId,
      messages: [{ id: uuidv4(), sender: 'agent', text: 'Hola, ¿en qué puedo ayudarte hoy?', timestamp: new Date() }],
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.sessions.push(newSession)
    return newSession
  }

  getSessions(): ChatSession[] {
    return [...this.sessions]
  }

  clearSessions(): void {
    this.sessions = []
  }
}

// Mock database for chat sessions
const mockChatSessions: ChatSession[] = []

export async function getChatSession(sessionId: string): Promise<ChatSession | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      const session = mockChatSessions.find(s => s.id === sessionId)
      resolve(session)
    }, 200)
  })
}

export async function createChatSession(sessionId: string, userId: string): Promise<ChatSession> {
  return new Promise(resolve => {
    setTimeout(() => {
      const newSession: ChatSession = {
        id: sessionId,
        userId,
        messages: [{ id: uuidv4(), sender: 'agent', text: 'Hola, ¿en qué puedo ayudarte hoy?', timestamp: new Date() }],
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockChatSessions.push(newSession)
      resolve(newSession)
    }, 300)
  })
}

export async function sendMessage(sessionId: string, message: ChatMessage): Promise<ChatMessage | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      const session = mockChatSessions.find(s => s.id === sessionId)
      if (session) {
        session.messages.push(message)
        session.updatedAt = new Date()

        // Simulate agent response
        const agentResponse: ChatMessage = {
          id: uuidv4(),
          sender: 'agent',
          text: `Recibí tu mensaje: "${message.text}". Un agente te responderá pronto.`,
          timestamp: new Date(),
        }
        session.messages.push(agentResponse)
        resolve(agentResponse)
      } else {
        resolve(undefined)
      }
    }, 500)
  })
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
