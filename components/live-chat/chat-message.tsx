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
    <div className={`flex items-start gap-2 ${isBot ? "" : "flex-row-reverse"}`}>
      <div
        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot ? "bg-[#5D1A1D]" : "bg-gray-600"
        }`}
      >
        {isBot ? (
          <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        ) : (
          <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        )}
      </div>
      <div
        className={`max-w-[75%] sm:max-w-xs rounded-lg px-2 sm:px-3 py-1 sm:py-2 ${
          isBot ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100" : "bg-[#5D1A1D] text-white"
        }`}
      >
        <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  )
}
