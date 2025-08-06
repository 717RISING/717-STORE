'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { ChatLoader } from '@/components/loaders/chat-loader' // Changed to named import
import { Message } from "ai"

interface ChatInterfaceProps {
  messages: Message[];
}

export function ChatInterface({ messages }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      // Assuming sendMessage is a function that needs to be defined
      // sendMessage(input)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, index) => (
          <ChatMessage key={index} message={m} />
        ))}
        {/* {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg max-w-[70%]">
              <ChatLoader className="!h-auto !w-auto" />
            </div>
          </div>
        )} */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex p-4 border-t border-gray-200 dark:border-gray-700">
        <Input
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 mr-2 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
          // disabled={isLoading}
        />
        <Button type="submit" className="bg-[#4A1518] hover:bg-[#6B1E22] text-white" // disabled={isLoading}>
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  )
}
