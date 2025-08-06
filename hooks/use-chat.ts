'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChatMessage } from '@/lib/types'
import { getChatSession, sendMessage as sendChatMessage, createChatSession } from '@/lib/chat-service'
import { v4 as uuidv4 } from 'uuid'

export function useChat(userId: string = 'guest_user') { // Default to guest user
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  const fetchSession = useCallback(async () => {
    setIsLoading(true)
    try {
      let currentSessionId = localStorage.getItem('chatSessionId')
      let sessionData

      if (currentSessionId) {
        sessionData = await getChatSession(currentSessionId)
      }

      if (!sessionData) {
        currentSessionId = uuidv4()
        sessionData = await createChatSession(currentSessionId, userId)
        localStorage.setItem('chatSessionId', currentSessionId)
      }

      setSessionId(currentSessionId)
      setMessages(sessionData?.messages || [])
    } catch (error) {
      console.error('Error fetching/creating chat session:', error)
      setMessages([{ id: uuidv4(), sender: 'agent', text: 'Lo siento, no pude cargar el chat. Por favor, inténtalo de nuevo más tarde.', timestamp: new Date() }])
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  const sendMessage = useCallback(async (text: string) => {
    if (!sessionId) return

    const newUserMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      const response = await sendChatMessage(sessionId, newUserMessage)
      if (response) {
        setMessages((prev) => [...prev, response])
      } else {
        setMessages((prev) => [...prev, { id: uuidv4(), sender: 'agent', text: 'Lo siento, no pude obtener una respuesta. Por favor, inténtalo de nuevo.', timestamp: new Date() }])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => [...prev, { id: uuidv4(), sender: 'agent', text: 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.', timestamp: new Date() }])
    } finally {
      setIsLoading(false)
    }
  }, [sessionId])

  return { messages, sendMessage, isLoading }
}
