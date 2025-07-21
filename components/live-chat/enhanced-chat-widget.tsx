"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Phone, Mail, Sparkles } from "lucide-react"
import ChatInterface from "./chat-interface"
import { useChat } from "@/hooks/use-chat"

export default function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const { unreadCount } = useChat()

  useEffect(() => {
    // Mostrar mensaje de bienvenida después de 3 segundos
    const timer = setTimeout(() => {
      setShowWelcome(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Ocultar mensaje de bienvenida después de 5 segundos
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showWelcome])

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(!isOpen)
    }
    setShowWelcome(false)
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

      {/* Welcome Tooltip - Solo en desktop */}
      {showWelcome && !isOpen && !isMinimized && (
        <div className="hidden sm:block fixed bottom-32 right-4 bg-gradient-to-br from-gray-900 to-black border border-[#5D1A1D] rounded-lg shadow-2xl p-4 max-w-xs z-[999]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5D1A1D] to-[#8B2635] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">¡Hola! 👋</p>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                ¿Necesitas ayuda? Estoy aquí para asistirte 24/7 con productos, envíos y más
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWelcome(false)}
              className="p-1 h-auto text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {/* Arrow */}
          <div className="absolute bottom-0 right-6 transform translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}

      {/* Contact Options y Chat Button - Todos juntos en el mismo contenedor */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-[998]">
        {/* Contact Options - Solo cuando el chat está cerrado */}
        {!isOpen && !isMinimized && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open("tel:+573001234567")}
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open("mailto:soporte@717store.com")}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
          </>
        )}

        {/* Main Chat Button - Siempre visible */}
        <Button
          onClick={handleToggle}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#5D1A1D] to-[#8B2635] hover:from-[#6B1E22] hover:to-[#9B2A3A] text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative ring-2 ring-[#5D1A1D]/20"
          size="sm"
        >
          {isOpen && !isMinimized ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </>
          )}
        </Button>
      </div>

      {/* Minimized indicator */}
      {isMinimized && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 bg-gradient-to-r from-[#5D1A1D] to-[#8B2635] text-white px-4 py-2 rounded-lg shadow-lg text-xs sm:text-sm z-[997] border border-[#5D1A1D]/30">
          Chat minimizado - Toca para abrir
        </div>
      )}
    </>
  )
}
