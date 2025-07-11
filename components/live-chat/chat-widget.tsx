"use client"

import { useState } from "react"
import { MessageCircle, X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ChatInterface from "./chat-interface"
import { useThemeSafe } from "@/hooks/use-theme-safe"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)
  const { theme } = useThemeSafe()

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setHasNewMessage(false)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const restoreChat = () => {
    setIsMinimized(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Interface */}
      {isOpen && !isMinimized && (
        <div className="mb-4 w-full max-w-sm sm:w-80 md:w-96">
          <div
            className={`rounded-lg shadow-2xl border overflow-hidden ${
              theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-[#5D1A1D] text-white">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Chat de Soporte</h3>
                  <p className="text-xs text-white/80 truncate">En línea • Respuesta rápida</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={minimizeChat}
                  className="text-white hover:bg-white/20 p-1 h-8 w-8"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-white hover:bg-white/20 p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="h-[400px] sm:h-[450px] md:h-[500px]">
              <ChatInterface onNewMessage={() => setHasNewMessage(true)} />
            </div>
          </div>
        </div>
      )}

      {/* Minimized Chat */}
      {isOpen && isMinimized && (
        <div className="mb-4">
          <Button
            onClick={restoreChat}
            className="bg-[#5D1A1D] hover:bg-[#6B1E22] text-white shadow-lg rounded-full p-3 h-auto"
          >
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Chat</span>
              {hasNewMessage && <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">1</Badge>}
            </div>
          </Button>
        </div>
      )}

      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className="bg-[#5D1A1D] hover:bg-[#6B1E22] text-white shadow-lg rounded-full p-4 h-auto relative"
      >
        <MessageCircle className="w-6 h-6" />
        {hasNewMessage && !isOpen && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
            1
          </Badge>
        )}
      </Button>
    </div>
  )
}
