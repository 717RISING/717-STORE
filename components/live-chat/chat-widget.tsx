"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ChatInterface from "./chat-interface"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Simular estado de conexión
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1) // 90% de tiempo online
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Simular notificación de nuevo mensaje
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setHasNewMessage(true)
      }, 10000) // Mostrar notificación después de 10 segundos

      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  const handleToggleChat = () => {
    setIsOpen(!isOpen)
    setHasNewMessage(false)
    setIsMinimized(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    setIsOpen(false)
  }

  const handleNewMessage = () => {
    if (!isOpen) {
      setHasNewMessage(true)
    }
  }

  return (
    <>
      {/* Chat Interface */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-20 right-4 z-50 w-80 h-96 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          <ChatInterface onClose={handleToggleChat} onMinimize={handleMinimize} onNewMessage={handleNewMessage} />
        </div>
      )}

      {/* Minimized Chat Indicator */}
      {isMinimized && (
        <div className="fixed bottom-20 right-4 z-50">
          <Button
            onClick={() => {
              setIsMinimized(false)
              setIsOpen(true)
            }}
            className="bg-[#4A1518] hover:bg-[#3A1014] text-white rounded-full p-3 shadow-lg cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            {hasNewMessage && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 rounded-full">
                1
              </Badge>
            )}
          </Button>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && !isMinimized && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={handleToggleChat}
            className="bg-[#4A1518] hover:bg-[#3A1014] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6" />
            {hasNewMessage && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 rounded-full animate-pulse">
                1
              </Badge>
            )}
          </Button>

          {/* Status Indicator */}
          <div className="absolute -top-1 -left-1">
            <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-500"}`}>
              {isOnline && <div className="w-3 h-3 rounded-full bg-green-500 animate-ping absolute"></div>}
            </div>
          </div>

          {/* Welcome Message Tooltip */}
          {!hasNewMessage && (
            <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300">
              ¿Necesitas ayuda? ¡Chatea con nosotros!
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
