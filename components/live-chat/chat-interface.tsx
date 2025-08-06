'use client'

import { ChatMessage } from './chat-message'
import { Message } from '@/hooks/use-chat'
import { useEffect, useRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface ChatInterfaceProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatInterface({ messages, isLoading }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <Skeleton className="h-10 w-3/4 rounded-lg" />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
