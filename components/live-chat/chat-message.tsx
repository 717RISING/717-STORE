"use client"

import { Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 ${message.isUser ? "flex-row-reverse" : ""} animate-fade-in`}>
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
          message.isUser
            ? "bg-gradient-to-br from-gray-700 to-gray-800"
            : "bg-gradient-to-br from-[#5D1A1D] to-[#8B2635]"
        }`}
      >
        {message.isUser ? (
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        ) : (
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        )}
      </div>
      <div
        className={`max-w-xs sm:max-w-sm rounded-2xl px-4 py-3 shadow-lg border ${
          message.isUser
            ? "bg-gradient-to-r from-gray-700 to-gray-600 text-white border-gray-600"
            : "bg-gradient-to-r from-gray-800 to-gray-700 text-white border-gray-600"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <p className="text-xs text-gray-400 mt-2">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  )
}
