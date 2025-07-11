"use client"

import type { ChatMessage } from "@/hooks/use-chat"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: ChatMessage
}

export default function ChatMessageComponent({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot"

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className={`flex gap-2 mb-4 ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div className="w-8 h-8 bg-[#5D1A1D] rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`max-w-[250px] sm:max-w-xs lg:max-w-md ${isBot ? "order-2" : "order-1"}`}>
        <div
          className={`px-3 py-2 rounded-lg text-sm ${
            isBot ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100" : "bg-[#5D1A1D] text-white"
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${isBot ? "text-left" : "text-right"}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>

      {!isBot && (
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 order-2">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  )
}
