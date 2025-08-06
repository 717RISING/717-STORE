'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, X } from 'lucide-react'
import { ChatInterface } from './chat-interface'
import { useChat } from '@/hooks/use-chat'
import { cn } from '@/lib/utils'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, sendMessage, isLoading } = useChat()

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full p-4 shadow-lg"
          aria-label="Open chat widget"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      <Card
        className={cn(
          "w-80 md:w-96 max-h-[80vh] flex flex-col",
          isOpen ? "block" : "hidden"
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b">
          <CardTitle className="text-lg">Soporte en Vivo</CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Close chat widget">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-y-auto">
          <ChatInterface messages={messages} isLoading={isLoading} />
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const input = form.elements.namedItem('message') as HTMLInputElement
              if (input.value.trim()) {
                sendMessage(input.value)
                input.value = ''
              }
            }}
            className="flex w-full space-x-2"
          >
            <input
              name="message"
              placeholder="Escribe tu mensaje..."
              className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>Enviar</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
