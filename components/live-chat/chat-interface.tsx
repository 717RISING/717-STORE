"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from 'lucide-react'
import ChatMessage from "./chat-message"
import { useChat } from "@/hooks/use-chat"

export default function ChatInterface() {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage, isLoading } = useChat()

  const handleSendMessage = async () => {
    if (input.trim()) {
      await sendMessage(input)
      setInput("")
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageSquare className="w-12 h-12 mb-4" />
            <p className="text-center">¡Hola! ¿En qué puedo ayudarte hoy?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.content} isUser={msg.role === "user"} />
          ))
        )}
        {isLoading && (
          <div className="flex justify-start mb-2">
            <div className="bg-gray-700 text-white p-3 rounded-lg max-w-[70%] animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-700 p-4 flex items-center gap-2">
        <Input
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
          className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-[#6B1E22]"
          disabled={isLoading}
        />
        <Button onClick={handleSendMessage} className="bg-[#4A1518] hover:bg-[#6B1E22] text-white" disabled={isLoading}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
