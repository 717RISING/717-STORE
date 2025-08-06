"use client"

import { useState, useEffect, useCallback } from "react"
import { fetchChatResponse } from "@/lib/chat-service"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = { role: "user", content: text }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setIsLoading(true)

    try {
      const assistantResponse = await fetchChatResponse(text)
      const assistantMessage: Message = { role: "assistant", content: assistantResponse }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Lo siento, hubo un error al procesar tu solicitud." },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial welcome message
  useEffect(() => {
    setMessages([{ role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte hoy?" }])
  }, [])

  return { messages, sendMessage, isLoading }
}
