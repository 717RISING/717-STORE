"use client"

import { useState, useCallback } from "react"

export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export interface QuickReply {
  id: string
  text: string
  action: string
}

const BOT_RESPONSES: Record<string, string> = {
  greeting: "¡Hola! Bienvenido a 717 Store. ¿En qué puedo ayudarte hoy?",
  prices:
    "Nuestros precios van desde $74.900 COP para accesorios hasta $194.900 COP para sudaderas premium. Todos nuestros productos tienen la mejor calidad streetwear.",
  shipping:
    "📦 Envíos a toda Colombia:\n• Medellín: 2-3 días ($15.000)\n• Ciudades principales: 3-5 días ($20.000)\n• Resto del país: 5-7 días ($25.000)\n• Envío GRATIS en pedidos sobre $300.000",
  sizes:
    "📏 Tenemos todas las tallas disponibles:\n• Camisetas: XS, S, M, L, XL, XXL\n• Sudaderas: S, M, L, XL, XXL\n• Pantalones: 28, 30, 32, 34, 36, 38\n• Accesorios: Talla única",
  payment:
    "💳 Métodos de pago aceptados:\n• Tarjetas de crédito/débito\n• PSE\n• Efecty\n• Baloto\n• Transferencias bancarias\n• Contraentrega (ciudades principales)",
  returns:
    "🔄 Política de devoluciones:\n• 30 días para devoluciones\n• Cambios de talla sin costo\n• Producto en perfecto estado\n• Reembolso completo garantizado",
  contact:
    "📞 Contáctanos:\n• WhatsApp: +57 300 123 4567\n• Email: soporte@717store.com\n• Horario: Lunes a Sábado 8AM-8PM",
  default:
    "Gracias por tu pregunta. Nuestro equipo de soporte te ayudará con cualquier consulta específica. ¿Te gustaría que te conecte con un agente?",
}

const QUICK_REPLIES: QuickReply[] = [
  { id: "1", text: "Ver precios", action: "prices" },
  { id: "2", text: "Info de envío", action: "shipping" },
  { id: "3", text: "Guía de tallas", action: "sizes" },
  { id: "4", text: "Métodos de pago", action: "payment" },
  { id: "5", text: "Devoluciones", action: "returns" },
  { id: "6", text: "Contacto", action: "contact" },
]

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: BOT_RESPONSES.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("precio") || message.includes("costo") || message.includes("cuanto")) {
      return BOT_RESPONSES.prices
    }
    if (
      message.includes("envio") ||
      message.includes("envío") ||
      message.includes("entrega") ||
      message.includes("domicilio")
    ) {
      return BOT_RESPONSES.shipping
    }
    if (message.includes("talla") || message.includes("tamaño") || message.includes("medida")) {
      return BOT_RESPONSES.sizes
    }
    if (message.includes("pago") || message.includes("pagar") || message.includes("tarjeta")) {
      return BOT_RESPONSES.payment
    }
    if (message.includes("devol") || message.includes("cambio") || message.includes("reembolso")) {
      return BOT_RESPONSES.returns
    }
    if (message.includes("contacto") || message.includes("telefono") || message.includes("whatsapp")) {
      return BOT_RESPONSES.contact
    }
    if (message.includes("hola") || message.includes("buenos") || message.includes("buenas")) {
      return "¡Hola! ¿En qué puedo ayudarte con tu compra en 717 Store?"
    }

    return BOT_RESPONSES.default
  }

  const sendMessage = useCallback(async (text: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate bot thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Add bot response
    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: getBotResponse(text),
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botResponse])
    setIsLoading(false)
    setUnreadCount((prev) => prev + 1)
  }, [])

  const handleQuickReply = useCallback(
    async (action: string) => {
      const response = BOT_RESPONSES[action] || BOT_RESPONSES.default
      await sendMessage(QUICK_REPLIES.find((r) => r.action === action)?.text || action)
    },
    [sendMessage],
  )

  const markAsRead = useCallback(() => {
    setUnreadCount(0)
  }, [])

  return {
    messages,
    isLoading,
    unreadCount,
    quickReplies: QUICK_REPLIES,
    sendMessage,
    handleQuickReply,
    markAsRead,
  }
}

// Export for compatibility
export const useChatService = useChat
