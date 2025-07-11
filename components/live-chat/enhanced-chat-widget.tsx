"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EnhancedButton from "../enhanced-button"
import ChatInterface from "./chat-interface"

export default function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setHasNewMessage(true)
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(welcomeTimeout)
  }, [])

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
      {/* Chat Interface - Responsive */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:w-80 h-[500px] sm:h-96 max-h-[80vh] animate-scale-in">
          <div className="bg-gray-900 border border-gray-700 rounded-modern-xl shadow-2xl overflow-hidden border-glow card-modern h-full">
            <ChatInterface onClose={handleToggleChat} onMinimize={handleMinimize} onNewMessage={handleNewMessage} />
          </div>
        </div>
      )}

      {/* Minimized Chat Indicator - Responsive */}
      {isMinimized && (
        <div className="fixed bottom-4 right-4 z-50 animate-bounce-subtle">
          <EnhancedButton
            variant="modern"
            size="icon"
            onClick={() => {
              setIsMinimized(false)
              setIsOpen(true)
            }}
            className="rounded-modern-2xl p-3 sm:p-4 shadow-lg hover-lift-modern"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            {hasNewMessage && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 min-w-[24px] h-6 rounded-modern animate-pulse">
                1
              </Badge>
            )}
          </EnhancedButton>
        </div>
      )}

      {/* Chat Toggle Button - Responsive */}
      {!isOpen && !isMinimized && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="relative">
            <EnhancedButton
              variant="modern"
              size="icon"
              onClick={handleToggleChat}
              className="rounded-modern-3xl p-4 sm:p-5 shadow-lg animate-float hover-lift-modern"
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              {hasNewMessage && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 min-w-[24px] h-6 rounded-modern animate-pulse">
                  1
                </Badge>
              )}
            </EnhancedButton>

            {/* Status Indicator */}
            <div className="absolute -top-1 -left-1">
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-500"}`}>
                {isOnline && (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 animate-ping absolute"></div>
                )}
              </div>
            </div>

            {/* Welcome Message - Hidden on mobile */}
            {showWelcome && !hasNewMessage && (
              <div className="absolute bottom-full right-0 mb-4 animate-slide-up hidden sm:block">
                <div className="bg-gray-800 text-white text-sm px-4 py-3 rounded-modern-lg shadow-lg max-w-xs border border-gray-700 border-glow card-modern">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#4A1518] animate-twinkle" />
                    <span className="font-semibold">¡Hola!</span>
                  </div>
                  <p>¿Necesitas ayuda? Estoy aquí para asistirte 24/7</p>
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
