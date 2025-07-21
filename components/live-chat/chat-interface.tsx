"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Minus, Send, Bot, Sparkles } from "lucide-react"
import { useChat } from "@/hooks/use-chat"
import ChatMessage from "./chat-message"

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
}

export default function ChatInterface({ isOpen, onClose, onMinimize }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage, isTyping, quickReplies, sendQuickReply } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim())
      setInputMessage("")
    }
  }

  const handleQuickReply = (reply: string) => {
    sendQuickReply(reply)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 w-[calc(100vw-1rem)] sm:w-80 md:w-96 h-[75vh] sm:h-[500px] z-[999]">
      <Card className="h-full flex flex-col shadow-2xl border-2 border-[#5D1A1D]/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-[#5D1A1D] to-[#8B2635] text-white rounded-t-lg px-4 py-3 shadow-lg">
          <CardTitle className="text-sm sm:text-base font-bold flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="hidden sm:inline text-white">Chat de Soporte</span>
              <span className="sm:hidden text-white">Soporte</span>
              <span className="text-xs text-white/80 font-normal">717 Store</span>
            </div>
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMinimize}
              className="h-8 w-8 p-0 hover:bg-white/20 rounded-full"
            >
              <Minus className="w-4 h-4 text-white" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 hover:bg-white/20 rounded-full">
              <X className="w-4 h-4 text-white" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 bg-gradient-to-b from-gray-900 to-black">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center text-gray-300 py-6 sm:py-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-[#5D1A1D] to-[#8B2635] rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <p className="text-sm sm:text-base font-semibold text-white mb-2">
                  ¡Hola! Soy tu asistente virtual de 717 Store
                </p>
                <p className="text-xs sm:text-sm text-gray-400">¿En qué puedo ayudarte hoy?</p>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#5D1A1D] to-[#8B2635] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl px-4 py-3 max-w-xs shadow-lg border border-gray-600">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#5D1A1D] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#5D1A1D] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#5D1A1D] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {quickReplies.length > 0 && (
            <div className="px-3 sm:px-4 pb-3 border-t border-gray-700">
              <div className="pt-3">
                <p className="text-xs text-gray-400 mb-2">Sugerencias rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs h-8 px-3 bg-gradient-to-r from-gray-800 to-gray-700 border-[#5D1A1D] text-white hover:bg-gradient-to-r hover:from-[#5D1A1D] hover:to-[#8B2635] hover:text-white transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-700 p-3 sm:p-4 bg-gradient-to-r from-gray-900 to-black">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 text-sm h-10 sm:h-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-full px-4 focus:border-[#5D1A1D] focus:ring-[#5D1A1D]"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-[#5D1A1D] to-[#8B2635] hover:from-[#6B1E22] hover:to-[#9B2A3A] text-white h-10 sm:h-12 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
