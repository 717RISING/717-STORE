'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare, X } from 'lucide-react'
import { ChatInterface } from './chat-interface'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-3 shadow-lg bg-[#4A1518] hover:bg-[#6B1E22] text-white z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-full max-w-sm h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col z-50 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-[#4A1518] rounded-t-lg">
            <h3 className="text-lg font-semibold text-white">Soporte en Línea</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Cerrar chat">
              <X className="h-5 w-5 text-white" />
            </Button>
          </div>
          <ChatInterface />
        </div>
      )}
    </>
  )
}
