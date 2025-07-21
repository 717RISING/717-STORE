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
        <div className="hidden sm:block fixed bottom-32 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 max-w-xs z-[999]">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-[#5D1A1D] rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">¡Hola! 👋</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                ¿Necesitas ayuda? Estoy aquí para asistirte 24/7
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowWelcome(false)} className="p-1 h-auto">
              <X className="w-3 h-3" />
            </Button>
          </div>
          {/* Arrow */}
          <div className="absolute bottom-0 right-6 transform translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
          </div>
        </div>
      )}

      {/* Contact Options y Chat Button - Todos juntos en el mismo contenedor */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[998]">
        {/* Contact Options - Solo cuando el chat está cerrado */}
        {!isOpen && !isMinimized && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gray-50 border-gray-200 shadow-md"
              onClick={() => window.open("tel:+573001234567")}
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-[#5D1A1D]" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gray-50 border-gray-200 shadow-md"
              onClick={() => window.open("mailto:soporte@717store.com")}
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#5D1A1D]" />
            </Button>
          </>
        )}

        {/* Main Chat Button - Siempre visible */}
        <Button
          onClick={handleToggle}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#5D1A1D] hover:bg-[#6B1E22] text-white shadow-lg hover:shadow-xl transition-all duration-300 relative"
          size="sm"
        >
          {isOpen && !isMinimized ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <>
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </>
          )}
        </Button>
      </div>

      {/* Minimized indicator */}
      {isMinimized && (
        <div className="fixed bottom-16 sm:bottom-20 right-4 bg-[#5D1A1D] text-white px-3 py-2 rounded-lg shadow-lg text-xs sm:text-sm z-[997]">
          Chat minimizado - Toca para abrir
        </div>
      )}
    </>
  )
}
