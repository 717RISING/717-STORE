"use client"

import { useState, useCallback } from "react"
import { chatService } from "@/lib/chat-service"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
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

const QUICK_REPLIES: Record<string, string> = {
  "Ver productos": "products",
  "Información de envío": "shipping",
  "Guía de tallas": "sizes",
  "Contactar soporte": "contact",
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: BOT_RESPONSES.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const [quickRepliesList, setQuickRepliesList] = useState<string[]>(Object.keys(QUICK_REPLIES))

  const addMessage = useCallback((content: string, sender: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    if (sender === "bot") {
      setUnreadCount((prev) => prev + 1)
    }
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      // Agregar mensaje del usuario
      addMessage(content, "user")

      // Mostrar indicador de escritura
      setIsTyping(true)

      try {
        // Obtener respuesta del bot
        const response = await chatService.sendMessage(content)

        // Simular delay de escritura
        setTimeout(
          () => {
            addMessage(response.message, "bot")
            setQuickRepliesList(response.quickReplies || [])
            setIsTyping(false)
          },
          1000 + Math.random() * 1000,
        )
      } catch (error) {
        setTimeout(() => {
          addMessage("Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.", "bot")
          setIsTyping(false)
        }, 1000)
      }
    },
    [addMessage],
  )

  const sendQuickReply = useCallback(
    (reply: string) => {
      const action = QUICK_REPLIES[reply]
      if (action) {
        sendMessage(action)
      }
      setQuickRepliesList([]) // Limpiar quick replies después de usar uno
    },
    [sendMessage],
  )

  const markAsRead = useCallback(() => {
    setUnreadCount(0)
  }, [])

  return {
    messages,
    isTyping,
    unreadCount,
    quickReplies: quickRepliesList,
    sendMessage,
    sendQuickReply,
    markAsRead,
  }
}

// Export for compatibility
export const useChatService = useChat
