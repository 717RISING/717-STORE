"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatMessage from "./chat-message"
import { useChatService } from "@/hooks/use-chat"
import { useThemeSafe } from "@/hooks/use-theme-safe"

interface ChatInterfaceProps {
  onNewMessage?: () => void
}

export default function ChatInterface({ onNewMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const { messages, sendMessage, isThinking } = useChatService()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { theme } = useThemeSafe()

  const quickReplies = [
    "¿Cuáles son los métodos de pago?",
    "¿Cuánto demora el envío?",
    "¿Tienen tallas disponibles?",
    "¿Cómo puedo rastrear mi pedido?",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isThinking])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = message.trim()
    setMessage("")

    await sendMessage(userMessage)
    onNewMessage?.()
  }

  const handleQuickReply = async (reply: string) => {
    await sendMessage(reply)
    onNewMessage?.()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollAreaRef}>
        <div className="space-y-3 sm:space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-6 sm:py-8">
              <Bot
                className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <h3
                className={`font-semibold text-base sm:text-lg mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                ¡Hola! 👋
              </h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Soy tu asistente virtual de 717 Store. ¿En qué puedo ayudarte hoy?
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isThinking && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Bot className="w-4 h-4" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Replies */}
      {messages.length === 0 && (
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 gap-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className={`text-left justify-start text-xs sm:text-sm h-auto py-2 px-3 ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className="truncate">{reply}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div
        className={`p-3 sm:p-4 border-t ${
          theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <div className="flex items-end space-x-2">
          <div className="flex-1 min-w-0">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className={`resize-none text-sm ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              disabled={isThinking}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isThinking}
            size="sm"
            className="bg-[#5D1A1D] hover:bg-[#6B1E22] text-white flex-shrink-0 h-10 w-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
