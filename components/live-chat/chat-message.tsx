"use client"

import { Bot, User } from "lucide-react"
import { useThemeSafe } from "@/hooks/use-theme-safe"

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
  const { theme } = useThemeSafe()
  const isBot = message.sender === "bot"

  return (
    <div className={`flex items-start space-x-2 sm:space-x-3 ${isBot ? "" : "flex-row-reverse space-x-reverse"}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
          isBot ? "bg-[#5D1A1D] text-white" : theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {isBot ? <Bot className="w-3 h-3 sm:w-4 sm:h-4" /> : <User className="w-3 h-3 sm:w-4 sm:h-4" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isBot ? "" : "flex justify-end"}`}>
        <div
          className={`max-w-[250px] sm:max-w-xs lg:max-w-md rounded-lg px-3 py-2 sm:px-4 sm:py-3 ${
            isBot
              ? theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-900"
              : "bg-[#5D1A1D] text-white"
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
          <p
            className={`text-xs mt-1 ${
              isBot ? (theme === "dark" ? "text-gray-400" : "text-gray-500") : "text-white/70"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    </div>
  )
}
