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
      {/* Chat Interface */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-20 right-4 z-50 w-80 h-96 animate-scale-in">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden border-glow">
            <ChatInterface onClose={handleToggleChat} onMinimize={handleMinimize} onNewMessage={handleNewMessage} />
          </div>
        </div>
      )}

      {/* Minimized Chat Indicator */}
      {isMinimized && (
        <div className="fixed bottom-20 right-4 z-50 animate-bounce-subtle">
          <EnhancedButton
            variant="glow"
            size="icon"
            onClick={() => {
              setIsMinimized(false)
              setIsOpen(true)
            }}
            className="rounded-full p-3 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            {hasNewMessage && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 rounded-full animate-pulse">
                1
              </Badge>
            )}
          </EnhancedButton>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && !isMinimized && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="relative">
            <EnhancedButton
              variant="pulse"
              size="icon"
              onClick={handleToggleChat}
              className="rounded-full p-4 shadow-lg animate-float"
            >
              <MessageCircle className="w-6 h-6" />
              {hasNewMessage && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 rounded-full animate-pulse">
                  1
                </Badge>
              )}
            </EnhancedButton>

            {/* Status Indicator */}
            <div className="absolute -top-1 -left-1">
              <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-500"}`}>
                {isOnline && <div className="w-3 h-3 rounded-full bg-green-500 animate-ping absolute"></div>}
              </div>
            </div>

            {/* Welcome Message */}
            {showWelcome && !hasNewMessage && (
              <div className="absolute bottom-full right-0 mb-4 animate-slide-up">
                <div className="bg-gray-800 text-white text-sm px-4 py-3 rounded-lg shadow-lg max-w-xs border border-gray-700 border-glow">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#4A1518]" />
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
