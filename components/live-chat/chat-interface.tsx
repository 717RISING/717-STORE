"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Minimize2, Send, Bot, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatMessage from "./chat-message"
import { useChatService } from "@/hooks/use-chat"

interface ChatInterfaceProps {
  onClose: () => void
  onMinimize: () => void
  onNewMessage: () => void
}

export default function ChatInterface({ onClose, onMinimize, onNewMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage, isConnected } = useChatService()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = message.trim()
    setMessage("")
    setIsTyping(true)

    await sendMessage(userMessage)
    setIsTyping(false)
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
  ]

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#4A1518] flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Soporte 717 Store</h3>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className="text-xs text-gray-400">{isConnected ? "En línea" : "Desconectado"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={onMinimize} className="text-gray-400 hover:text-white h-8 w-8">
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">¡Hola! 👋</h4>
              <p className="text-sm text-gray-400 mb-4">
                Soy el asistente virtual de 717 Store. ¿En qué puedo ayudarte hoy?
              </p>
              <div className="space-y-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMessage(reply)
                      handleSendMessage()
                    }}
                    className="w-full text-left justify-start text-xs bg-gray-800 border-gray-600 hover:bg-gray-700 text-white"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-[#5D1A1D] flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="bg-gray-800 rounded-lg px-3 py-2 max-w-xs">
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
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-black border-gray-800 text-white placeholder-gray-400 focus:border-[#4A1518]"
            disabled={!isConnected}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || !isConnected}
            className="bg-[#4A1518] hover:bg-[#3A1014] text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {!isConnected && (
          <p className="text-xs text-red-400 mt-2 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Reconectando...
          </p>
        )}
      </div>
    </div>
  )
}
