"use client"

import { useState, useCallback } from "react"
import { getChatResponse, getQuickReplies } from "@/lib/chat-service"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "Ver productos",
    "Información de envío",
    "Guía de tallas",
    "Métodos de pago",
    "Política de cambios",
    "Contactar soporte",
    "Ofertas especiales",
    "Estado de pedido",
  ])

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = getChatResponse(text)
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, botMessage])
    setQuickReplies(getQuickReplies(text))
    setIsTyping(false)
  }, [])

  const sendQuickReply = useCallback(
    async (reply: string) => {
      await sendMessage(reply)
    },
    [sendMessage],
  )

  return {
    messages,
    sendMessage,
    sendQuickReply,
    isTyping,
    quickReplies,
  }
}
