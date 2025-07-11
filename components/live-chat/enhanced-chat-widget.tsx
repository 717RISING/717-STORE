"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Minimize2, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import ChatInterface from "./chat-interface"
import { useThemeSafe } from "@/hooks/use-theme-safe"

export default function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const { theme } = useThemeSafe()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setShowWelcome(false)
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
      {/* Welcome Tooltip - Hidden on mobile */}
      {showWelcome && !isOpen && (
        <div className="hidden sm:block mb-4 mr-16">
          <Card
            className={`shadow-lg border ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#5D1A1D] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    ¡Hola! 👋
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>¿Necesitas ayuda?</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowWelcome(false)} className="p-1 h-6 w-6">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && !isMinimized && (
        <div className="mb-4 w-full max-w-sm sm:w-80 md:w-96">
          <Card
            className={`shadow-2xl border overflow-hidden ${
              theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-[#5D1A1D] to-[#6B1E22] text-white">
              <div className="flex items-center justify-between p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">Soporte 717 Store</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-xs text-white/80">En línea</p>
                    </div>
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

              {/* Contact Options */}
              <div className="px-3 sm:px-4 pb-3 flex space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 text-xs flex-1 h-8">
                  <Phone className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Llamar</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 text-xs flex-1 h-8">
                  <Mail className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Email</span>
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="h-[400px] sm:h-[450px] md:h-[500px]">
              <ChatInterface onNewMessage={() => setHasNewMessage(true)} />
            </div>
          </Card>
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
              <span className="text-sm font-medium hidden sm:inline">Chat</span>
              {hasNewMessage && <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">1</Badge>}
            </div>
          </Button>
        </div>
      )}

      {/* Enhanced Toggle Button */}
      <Button
        onClick={toggleChat}
        className="bg-gradient-to-r from-[#5D1A1D] to-[#6B1E22] hover:from-[#6B1E22] hover:to-[#7A2125] text-white shadow-lg rounded-full p-4 h-auto relative transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
        {hasNewMessage && !isOpen && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0 animate-bounce">
            1
          </Badge>
        )}
      </Button>
    </div>
  )
}
