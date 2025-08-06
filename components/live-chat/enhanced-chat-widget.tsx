"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare, X } from 'lucide-react'
import { ChatInterface } from './chat-interface'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobileDetection()

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Abrir chat</span>
        </Button>
        <SheetContent side="right" className="w-full h-full flex flex-col p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Soporte en Vivo</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Abrir chat</span>
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-96 h-[500px] bg-background border rounded-lg shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Soporte en Vivo</h2>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar chat</span>
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      )}
    </>
  )
}
