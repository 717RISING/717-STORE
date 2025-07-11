"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, X, Minimize2 } from "lucide-react"
import { useChat } from "@/hooks/use-chat"
import ChatMessage from "./chat-message"

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
}

export default function ChatInterface({ isOpen, onClose, onMinimize }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("")
  const { messages, isLoading, sendMessage, markAsRead } = useChat()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      markAsRead()
      inputRef.current?.focus()
    }
  }, [isOpen, markAsRead])

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    await sendMessage(inputValue)
    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickReplies = ["¿Cuáles son los precios?", "Información de envío", "Guía de tallas", "Métodos de pago"]

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm sm:w-80 h-[500px] sm:h-96 max-h-[80vh] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-[#5D1A1D] text-white rounded-t-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base">717 Store</h3>
            <p className="text-xs opacity-90">En línea</p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" onClick={onMinimize} className="text-white hover:bg-white/20 p-1 sm:p-2">
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 p-1 sm:p-2">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollAreaRef}>
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 sm:p-3 max-w-[250px] sm:max-w-xs">
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
      {messages.length <= 1 && (
        <div className="px-3 sm:px-4 pb-2">
          <div className="grid grid-cols-1 gap-1 sm:gap-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputValue(reply)
                  sendMessage(reply)
                }}
                className="text-xs sm:text-sm h-8 justify-start text-left border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
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
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className="bg-[#5D1A1D] hover:bg-[#6B1E22] text-white px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
