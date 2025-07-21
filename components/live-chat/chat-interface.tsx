"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Minus, Send, Bot } from "lucide-react"
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
    <div className="fixed bottom-20 right-4 w-80 sm:w-96 h-96 z-[999]">
      <Card className="h-full flex flex-col shadow-xl border-0 bg-white dark:bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-[#5D1A1D] text-white rounded-t-lg">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Chat de Soporte 717 Store
          </CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={onMinimize} className="h-6 w-6 p-0 hover:bg-white/20">
              <Minus className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 hover:bg-white/20">
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 text-[#5D1A1D]" />
                <p className="text-sm">¡Hola! Soy tu asistente virtual de 717 Store.</p>
                <p className="text-xs mt-1">¿En qué puedo ayudarte hoy?</p>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#5D1A1D] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 max-w-xs">
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

          {/* Quick Replies */}
          {quickReplies.length > 0 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs h-7 px-2 border-[#5D1A1D] text-[#5D1A1D] hover:bg-[#5D1A1D] hover:text-white"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 text-sm"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-[#5D1A1D] hover:bg-[#6B1E22] text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
