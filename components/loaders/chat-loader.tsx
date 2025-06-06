"use client"

import { useState, useEffect } from "react"
import { MessageCircle, User, Bot } from "lucide-react"

interface ChatLoaderProps {
  size?: "sm" | "md" | "lg"
  status?: "connecting" | "typing" | "thinking"
}

export default function ChatLoader({ size = "md", status = "connecting" }: ChatLoaderProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [typingDots, setTypingDots] = useState(1)

  const messages = {
    connecting: "Conectando con soporte...",
    typing: "Agente escribiendo...",
    thinking: "Procesando consulta...",
  }

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % 3)
    }, 800)

    const dotsInterval = setInterval(() => {
      setTypingDots((prev) => (prev % 3) + 1)
    }, 500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* Chat Bubbles Animation */}
      <div className="relative">
        <div className="flex space-x-3">
          {/* User Message */}
          <div className="flex flex-col items-end space-y-2">
            <div
              className={`${messageIndex >= 0 ? "animate-slide-in-right" : "opacity-0"} bg-[#4A1518] text-white px-3 py-2 rounded-modern-lg rounded-br-sm max-w-xs`}
            >
              <p className="text-sm">¡Hola! Necesito ayuda</p>
            </div>
            <User className="w-6 h-6 text-[#4A1518]" />
          </div>

          {/* Bot Response */}
          <div className="flex flex-col items-start space-y-2">
            <Bot className="w-6 h-6 text-gray-400" />
            <div
              className={`${messageIndex >= 1 ? "animate-slide-in-left" : "opacity-0"} bg-gray-800 text-white px-3 py-2 rounded-modern-lg rounded-bl-sm max-w-xs`}
            >
              <p className="text-sm">
                {status === "typing" ? (
                  <span className="flex items-center space-x-1">
                    <span>Escribiendo</span>
                    {[...Array(typingDots)].map((_, i) => (
                      <span
                        key={i}
                        className="w-1 h-1 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </span>
                ) : (
                  "¡Perfecto! Te ayudo enseguida"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Connection Indicator */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <MessageCircle className="w-5 h-5 text-[#4A1518] animate-bounce" />
          <p className="text-white font-medium">{messages[status]}</p>
        </div>

        {/* Typing Indicator */}
        {status === "typing" && (
          <div className="flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#4A1518] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
