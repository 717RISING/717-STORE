"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Bot, Smartphone, Mic } from "lucide-react"

interface MobileChatLoaderProps {
  size?: "sm" | "md" | "lg"
  status?: "connecting" | "typing" | "thinking"
  hapticFeedback?: boolean
}

export default function MobileChatLoader({
  size = "md",
  status = "connecting",
  hapticFeedback = true,
}: MobileChatLoaderProps) {
  const [typingDots, setTypingDots] = useState(1)
  const [connectionStrength, setConnectionStrength] = useState(0)
  const [vibration, setVibration] = useState(false)

  const messages = {
    connecting: "Conectando...",
    typing: "Escribiendo...",
    thinking: "Procesando...",
  }

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setTypingDots((prev) => (prev % 3) + 1)
    }, 400)

    const connectionInterval = setInterval(() => {
      setConnectionStrength((prev) => (prev >= 100 ? 0 : prev + 10))
    }, 200)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(connectionInterval)
    }
  }, [])

  useEffect(() => {
    if (hapticFeedback && status === "typing") {
      const vibrationInterval = setInterval(() => {
        setVibration(true)
        setTimeout(() => setVibration(false), 100)
      }, 1000)
      return () => clearInterval(vibrationInterval)
    }
  }, [hapticFeedback, status])

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 touch-manipulation">
      {/* Mobile Chat Interface */}
      <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl max-w-sm w-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Soporte 717</p>
              <div className="flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full transition-all duration-200 ${
                      connectionStrength > i * 33 ? "bg-green-500" : "bg-gray-600"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">En línea</span>
              </div>
            </div>
          </div>
          <Mic className="w-5 h-5 text-gray-400" />
        </div>

        {/* Chat Messages */}
        <div className="space-y-3 mb-4">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-[#4A1518] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
              <p className="text-sm">¡Hola! Necesito ayuda</p>
            </div>
          </div>

          {/* Bot Response */}
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-gray-300" />
            </div>
            <div
              className={`bg-gray-800 text-white px-4 py-2 rounded-2xl rounded-bl-md max-w-xs transition-transform duration-100 ${
                vibration ? "scale-105" : "scale-100"
              }`}
            >
              {status === "typing" ? (
                <div className="flex items-center space-x-1">
                  <span className="text-sm">Escribiendo</span>
                  {[...Array(typingDots)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm">¡Te ayudo enseguida!</p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Input Area */}
        <div className="flex items-center space-x-3 bg-gray-800 rounded-2xl p-3">
          <div className="flex-1 text-gray-400 text-sm">{messages[status]}</div>
          <div className="w-8 h-8 bg-[#4A1518] rounded-full flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Mobile Status */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Smartphone className="w-4 h-4 text-[#4A1518]" />
          <p className="text-white font-medium">{messages[status]}</p>
        </div>

        {/* Connection Progress */}
        <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full transition-all duration-200"
            style={{ width: `${connectionStrength}%` }}
          />
        </div>

        <p className="text-gray-400 text-sm mt-2">Conexión segura</p>
      </div>
    </div>
  )
}
