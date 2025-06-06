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
    <div className={`flex items-start space-x-3 animate-fade-in ${isBot ? "" : "flex-row-reverse space-x-reverse"}`}>
      <div
        className={`w-8 h-8 rounded-modern-lg flex items-center justify-center flex-shrink-0 ${
          isBot ? "bg-gradient-to-r from-[#5D1A1D] to-[#4A1518]" : "bg-gradient-to-r from-gray-600 to-gray-700"
        }`}
      >
        {isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
      </div>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-modern-lg shadow-lg card-modern ${
          isBot ? "bg-gray-800 text-white" : "bg-gradient-to-r from-[#4A1518] to-[#6B1E22] text-white"
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  )
}
