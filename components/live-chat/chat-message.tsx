"use client"

import { Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot"

  return (
    <div className={`flex items-start gap-3 animate-fade-in ${isBot ? "" : "flex-row-reverse"}`}>
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
          isBot ? "bg-gradient-to-br from-[#5D1A1D] to-[#8B2635]" : "bg-gradient-to-br from-gray-600 to-gray-700"
        }`}
      >
        {isBot ? (
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        ) : (
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        )}
      </div>
      <div
        className={`max-w-[80%] sm:max-w-xs rounded-2xl px-4 py-3 shadow-lg ${
          isBot
            ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white border border-gray-600"
            : "bg-gradient-to-br from-[#5D1A1D] to-[#8B2635] text-white"
        }`}
      >
        <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
        <p className={`text-xs mt-2 ${isBot ? "text-gray-400" : "text-white/70"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  )
}
