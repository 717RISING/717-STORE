"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail } from "lucide-react"
import ChatInterface from "./chat-interface"
import { useChat } from "@/hooks/use-chat"

export default function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const { unreadCount, markAsRead } = useChat()

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    markAsRead()
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    setIsOpen(false)
  }

  return (
    <>
      {/* Botones de contacto fijos */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[998]">
        {/* Botones de contacto adicionales */}
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-full w-12 h-12 p-0"
          onClick={() => window.open("tel:+573001234567", "_self")}
        >
          <Phone className="w-5 h-5" />
        </Button>

        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full w-12 h-12 p-0"
          onClick={() => window.open("mailto:soporte@717store.com", "_self")}
        >
          <Mail className="w-5 h-5" />
        </Button>

        {/* Botón principal del chat */}
        <Button
          onClick={handleOpen}
          className="bg-[#5D1A1D] hover:bg-[#6B1E22] text-white shadow-lg rounded-full w-14 h-14 p-0 relative"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </div>

      {/* Interfaz del chat */}
      <ChatInterface isOpen={isOpen} onClose={handleClose} onMinimize={handleMinimize} />
    </>
  )
}
