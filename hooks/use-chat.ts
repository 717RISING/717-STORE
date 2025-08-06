import { useState, useCallback } from 'react'
import { generateChatResponse } from '@/lib/chat-service' // Assuming this function exists

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (text: string) => {
    const newUserMessage: Message = { role: 'user', content: text }
    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setIsLoading(true)
    setError(null)

    try {
      const assistantResponse = await generateChatResponse(text)
      const newAssistantMessage: Message = { role: 'assistant', content: assistantResponse }
      setMessages((prevMessages) => [...prevMessages, newAssistantMessage])
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Lo siento, no pude procesar tu solicitud en este momento. Por favor, inténtalo de nuevo más tarde.")
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "Lo siento, hubo un error al procesar tu mensaje." }
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { messages, sendMessage, isLoading, error }
}
