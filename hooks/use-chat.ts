'use client'

import { useState, useCallback } from 'react'
import { sendMessage as sendChatMessage } from '@/lib/chat-service'

export type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (content: string) => {
    const newUserMessage: Message = { role: 'user', content }
    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setIsLoading(true)

    try {
      const assistantResponse = await sendChatMessage(content)
      const newAssistantMessage: Message = { role: 'assistant', content: assistantResponse }
      setMessages((prevMessages) => [...prevMessages, newAssistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu solicitud.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { messages, sendMessage, isLoading }
}
