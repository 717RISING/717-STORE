'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from 'lucide-react'
import { ChatInterface } from "./chat-interface"
import { useChat } from "@/hooks/use-chat"
import { ChatLoader } from "@/components/loaders/chat-loader"

export function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col max-h-[80vh]">
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold">Soporte en Vivo</h3>
            <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Cerrar chat">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <ChatLoader />
            ) : (
              <ChatInterface messages={messages} />
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={input}
                onChange={handleInputChange}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>Enviar</Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={toggleChat}
          aria-label="Abrir chat de soporte"
        >
          <MessageSquare className="h-8 w-8" />
        </Button>
      )}
    </div>
  )
}
