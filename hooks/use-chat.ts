"use client"

import { useState, useCallback } from "react"

export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply" | "product-suggestion"
}

export interface ChatState {
  messages: ChatMessage[]
  isLoading: boolean
  isConnected: boolean
  unreadCount: number
}

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: "1",
        text: "¡Hola! Soy el asistente virtual de 717 Store. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      },
    ],
    isLoading: false,
    isConnected: true,
    unreadCount: 0,
  })

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }))

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botResponse],
        isLoading: false,
      }))
    }, 1000)
  }, [])

  const markAsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      unreadCount: 0,
    }))
  }, [])

  const clearChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      messages: [prev.messages[0]], // Mantener mensaje de bienvenida
    }))
  }, [])

  return {
    ...state,
    sendMessage,
    markAsRead,
    clearChat,
  }
}

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  if (message.includes("precio") || message.includes("costo")) {
    return "Nuestros productos van desde $74.900 hasta $179.900 COP. ¿Te interesa algún producto en particular?"
  }

  if (message.includes("envío") || message.includes("domicilio")) {
    return "Ofrecemos envío gratis en pedidos superiores a $300.000. En Medellín entregamos en 2-3 días, y en el resto del país en 3-7 días hábiles."
  }

  if (message.includes("talla") || message.includes("size")) {
    return "Tenemos tallas desde S hasta XL. Puedes consultar nuestra guía de tallas en el menú principal."
  }

  if (message.includes("pago") || message.includes("tarjeta")) {
    return "Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias. Todos los pagos son 100% seguros."
  }

  return "Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto. ¿Hay algo más en lo que pueda ayudarte?"
}

// Mantener compatibilidad con el hook anterior
export const useChatService = useChat
