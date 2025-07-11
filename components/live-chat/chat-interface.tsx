"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Minimize2, Send, Bot, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatMessage from "./chat-message"
import { useChatService } from "@/hooks/use-chat"
import EnhancedButton from "../enhanced-button"

interface ChatInterfaceProps {
  onClose: () => void
  onMinimize: () => void
  onNewMessage: () => void
}

export default function ChatInterface({ onClose, onMinimize, onNewMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage, isConnected, isThinking } = useChatService()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = message.trim()
    setMessage("")

    await sendMessage(userMessage)
    onNewMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickReplies = [
    "¿Cuáles son los métodos de pago?",
    "¿Cómo puedo rastrear mi pedido?",
    "¿Cuál es la política de devoluciones?",
    "¿Tienen envío gratis?",
    "¿Qué productos nuevos tienen?",
    "¿Cómo encuentro mi talla perfecta?",
  ]

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white rounded-modern-xl overflow-hidden">
      {/* Header - Responsive */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gray-800 rounded-t-modern-xl flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-modern-lg bg-gradient-to-r from-[#4A1518] to-[#6B1E22] flex items-center justify-center shadow-lg relative flex-shrink-0">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            {isThinking && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse">
                <Sparkles className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base truncate">Asistente IA 717 Store</h3>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`}
              ></div>
              <span className="text-xs text-gray-400 truncate">
                {isThinking ? "Pensando..." : isConnected ? "IA Activa" : "Desconectado"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMinimize}
            className="text-gray-400 hover:text-white h-7 w-7 sm:h-8 sm:w-8 rounded-modern hover-glow-modern"
          >
            <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white h-7 w-7 sm:h-8 sm:w-8 rounded-modern hover-glow-modern"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>

      {/* Messages - Responsive ScrollArea */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full p-3 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-4 sm:py-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-modern-2xl bg-gradient-to-r from-[#4A1518] to-[#6B1E22] mx-auto mb-3 sm:mb-4 flex items-center justify-center animate-pulse-glow">
                  <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="font-semibold mb-2 text-base sm:text-lg">¡Hola! 🤖</h4>
                <p className="text-sm text-gray-400 mb-2">Soy tu asistente de IA para 717 Store</p>
                <p className="text-xs text-gray-500 mb-4 sm:mb-6">
                  Powered by OpenAI • Respuestas inteligentes en tiempo real
                </p>
                <div className="space-y-2 sm:space-y-3">
                  {quickReplies.map((reply, index) => (
                    <EnhancedButton
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMessage(reply)
                        handleSendMessage()
                      }}
                      className="w-full text-left justify-start text-xs rounded-modern-lg border-gray-600 hover:border-[#4A1518] hover:bg-[#4A1518]/10 text-white p-2"
                    >
                      <span className="truncate">{reply}</span>
                    </EnhancedButton>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {isThinking && (
              <div className="flex items-start space-x-2 sm:space-x-3 animate-slide-in-left">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-modern-lg bg-gradient-to-r from-[#5D1A1D] to-[#4A1518] flex items-center justify-center flex-shrink-0 relative">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse">
                    <Sparkles className="w-1 h-1 sm:w-2 sm:h-2 text-white absolute top-0.5 left-0.5" />
                  </div>
                </div>
                <div className="bg-gray-800 rounded-modern-lg px-3 py-2 sm:px-4 sm:py-3 max-w-xs card-modern">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">IA pensando...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input - Responsive */}
      <div className="p-3 sm:p-4 border-t border-gray-700 bg-gray-800/50 rounded-b-modern-xl flex-shrink-0">
        <div className="flex space-x-2 sm:space-x-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pregúntame sobre 717 Store..."
            className="flex-1 bg-black/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#4A1518] rounded-modern-lg input-modern text-sm min-w-0"
            disabled={!isConnected || isThinking}
          />
          <EnhancedButton
            onClick={handleSendMessage}
            disabled={!message.trim() || !isConnected || isThinking}
            variant="modern"
            size="icon"
            className="rounded-modern-lg flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10"
          >
            <Send className="w-3 h-3 sm:w-4 sm:h-4" />
          </EnhancedButton>
        </div>
        {!isConnected && (
          <p className="text-xs text-red-400 mt-2 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Reconectando...
          </p>
        )}
        {isThinking && (
          <p className="text-xs text-blue-400 mt-2 flex items-center">
            <Sparkles className="w-3 h-3 mr-1 animate-spin" />
            La IA está procesando tu consulta...
          </p>
        )}
      </div>
    </div>
  )
}
