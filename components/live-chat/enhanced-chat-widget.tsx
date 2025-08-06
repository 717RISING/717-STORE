'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare, X } from 'lucide-react'
import { ChatInterface } from './chat-interface'
import { useChat } from '@/hooks/use-chat'
import { cn } from '@/lib/utils'

export function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, sendMessage, isLoading } = useChat()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat de soporte"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      )}

      <div
        className={cn(
          "fixed bottom-4 right-4 w-full max-w-sm bg-background border rounded-lg shadow-xl flex flex-col transition-all duration-300",
          isOpen ? "h-[500px] opacity-100 visible" : "h-0 opacity-0 invisible"
        )}
      >
        {isOpen && (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Soporte en Línea</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Cerrar chat">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ChatInterface messages={messages} onSendMessage={sendMessage} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  )
}
