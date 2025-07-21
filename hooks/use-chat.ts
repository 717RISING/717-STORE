"use client"

import { useState, useCallback } from "react"
import { chatService } from "@/lib/chat-service"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const INITIAL_QUICK_REPLIES = [
  "Ver productos",
  "Información de envío",
  "Guía de tallas",
  "Métodos de pago",
  "Ofertas especiales",
  "Cambios y devoluciones",
  "Contactar soporte",
  "Horarios de atención",
]

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "¡Hola! 👋 Bienvenido a 717 Store.\n\nSoy tu asistente virtual y estoy aquí para ayudarte con:\n\n🛍️ Información de productos\n📦 Envíos y entregas\n📏 Guía de tallas\n💳 Métodos de pago\n🔄 Cambios y devoluciones\n📞 Soporte técnico\n\n¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const [quickReplies, setQuickReplies] = useState<string[]>(INITIAL_QUICK_REPLIES)

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

        // Simular delay de escritura más realista
        setTimeout(
          () => {
            addMessage(response.message, "bot")
            // Siempre mostrar quick replies después de cada respuesta
            setQuickReplies(response.quickReplies || INITIAL_QUICK_REPLIES)
            setIsTyping(false)
          },
          1500 + Math.random() * 1000,
        )
      } catch (error) {
        setTimeout(() => {
          addMessage(
            "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo o contacta a nuestro soporte.",
            "bot",
          )
          setQuickReplies(INITIAL_QUICK_REPLIES)
          setIsTyping(false)
        }, 1000)
      }
    },
    [addMessage],
  )

  const sendQuickReply = useCallback(
    (reply: string) => {
      sendMessage(reply)
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
    quickReplies,
    sendMessage,
    sendQuickReply,
    markAsRead,
  }
}
