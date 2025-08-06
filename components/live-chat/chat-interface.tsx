"use client"

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { useChat } from '@/hooks/use-chat'
import { ChatLoader } from '@/components/loaders/chat-loader'
import { MobileChatLoader } from '@/components/loaders/mobile/mobile-chat-loader'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export function ChatInterface() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      await sendMessage(input)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (isMobile ? <MobileChatLoader /> : <ChatLoader />)}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex p-4 border-t bg-card">
        <Input
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 mr-2"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-5 w-5" />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  )
}
