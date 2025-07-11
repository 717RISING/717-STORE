"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import ChatInterface from "./chat-interface"
import { useChat } from "@/hooks/use-chat"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const { unreadCount } = useChat()

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(!isOpen)
    }
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
      {/* Chat Interface */}
      <ChatInterface isOpen={isOpen && !isMinimized} onClose={handleClose} onMinimize={handleMinimize} />

      {/* Chat Button */}
      <Button
        onClick={handleToggle}
        className="fixed bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#5D1A1D] hover:bg-[#6B1E22] text-white shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        size="sm"
      >
        {isOpen && !isMinimized ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </>
        )}
      </Button>

      {/* Minimized indicator */}
      {isMinimized && (
        <div className="fixed bottom-16 right-4 bg-[#5D1A1D] text-white px-3 py-2 rounded-lg shadow-lg text-sm">
          Chat minimizado
        </div>
      )}
    </>
  )
}
