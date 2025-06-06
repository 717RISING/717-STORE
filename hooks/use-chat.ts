"use client"

import { useState, useEffect, useCallback } from "react"
import type { ChatMessageData } from "@/components/live-chat/chat-message"
import { getChatResponse } from "@/lib/chat-service"

export function useChatService() {
  const [messages, setMessages] = useState<ChatMessageData[]>([])
  const [isConnected, setIsConnected] = useState(true)

  // Simular conexión intermitente
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected((prev) => (Math.random() > 0.05 ? true : prev)) // 95% de tiempo conectado
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    // Agregar mensaje del usuario
    const userMessage: ChatMessageData = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, userMessage])

    // Actualizar estado del mensaje
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "sent" } : msg)))
    }, 500)

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)

    // Simular respuesta del bot
    try {
      const response = await getChatResponse(content)

      setTimeout(
        () => {
          const botMessage: ChatMessageData = {
            id: (Date.now() + 1).toString(),
            content: response,
            sender: "bot",
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, botMessage])

          // Marcar mensaje del usuario como leído
          setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" } : msg)))
        },
        1000 + Math.random() * 2000,
      ) // Respuesta entre 1-3 segundos
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }, [])

  return {
    messages,
    sendMessage,
    isConnected,
  }
}
