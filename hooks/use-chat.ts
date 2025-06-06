"use client"

import { useState, useEffect, useCallback } from "react"
import type { ChatMessageData } from "@/components/live-chat/chat-message"
import { getChatResponse } from "@/lib/chat-service"

export function useChatService() {
  const [messages, setMessages] = useState<ChatMessageData[]>([])
  const [isConnected, setIsConnected] = useState(true)
  const [isThinking, setIsThinking] = useState(false)

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

    // Mostrar indicador de "pensando"
    setIsThinking(true)

    try {
      // Obtener respuesta de IA o fallback
      const response = await getChatResponse(content)

      // Simular tiempo de respuesta más realista para IA
      const thinkingTime = response.length > 100 ? 2000 : 1000

      setTimeout(() => {
        setIsThinking(false)

        const botMessage: ChatMessageData = {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])

        // Marcar mensaje del usuario como leído
        setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" } : msg)))
      }, thinkingTime)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsThinking(false)

      // Mensaje de error
      const errorMessage: ChatMessageData = {
        id: (Date.now() + 1).toString(),
        content: "Lo siento, hay un problema temporal con el servicio. Por favor intenta de nuevo en unos momentos.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    }
  }, [])

  return {
    messages,
    sendMessage,
    isConnected,
    isThinking,
  }
}
