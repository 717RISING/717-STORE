"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, X, Minimize2, Phone, Mail } from "lucide-react"
import { useChat } from "@/hooks/use-chat"
import ChatMessageComponent from "./chat-message"

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
}

export default function ChatInterface({ isOpen, onClose, onMinimize }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("")
  const { messages, isLoading, quickReplies, sendMessage, handleQuickReply, markAsRead } = useChat()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      markAsRead()
      // Focus en el input cuando se abre el chat
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen, markAsRead])

  useEffect(() => {
    // Auto scroll al último mensaje
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickReplyClick = (action: string) => {
    handleQuickReply(action)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm sm:w-80 md:w-96 h-[500px] sm:h-[550px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5D1A1D] to-[#6B1E22] text-white p-3 sm:p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm sm:text-base font-bold">717</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base truncate">Soporte 717 Store</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-white/80">En línea • Respuesta inmediata</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={onMinimize} className="text-white hover:bg-white/20 p-1 h-8 w-8">
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 p-1 h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contact Options */}
        <div className="flex space-x-2 mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 text-xs flex-1 h-8"
            onClick={() => window.open("tel:+573001234567")}
          >
            <Phone className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Llamar</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 text-xs flex-1 h-8"
            onClick={() => window.open("mailto:soporte@717store.com")}
          >
            <Mail className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Email</span>
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-3 sm:p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessageComponent key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex justify-start">
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
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex flex-wrap gap-1">
            {quickReplies.slice(0, 3).map((reply) => (
              <Button
                key={reply.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReplyClick(reply.action)}
                className="text-xs h-7 px-2 border-[#5D1A1D] text-[#5D1A1D] hover:bg-[#5D1A1D] hover:text-white"
              >
                {reply.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="bg-[#5D1A1D] hover:bg-[#6B1E22] text-white px-3 py-2 h-auto"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
