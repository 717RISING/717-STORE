"use client"

import { User, Bot, Clock, CheckCheck } from "lucide-react"

export interface ChatMessageData {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  status?: "sending" | "sent" | "delivered" | "read"
}

interface ChatMessageProps {
  message: ChatMessageData
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className={`flex items-start space-x-2 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-gray-800" : "bg-[#4A1518]"
        }`}
      >
        {isUser ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
      </div>

      {/* Message Content */}
      <div className={`max-w-xs ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div className={`rounded-lg px-3 py-2 ${isUser ? "bg-[#4A1518] text-white" : "bg-gray-900 text-white"}`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Timestamp and Status */}
        <div className={`flex items-center space-x-1 mt-1 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>

          {isUser && message.status && (
            <div className="flex items-center">
              {message.status === "sending" && <Clock className="w-3 h-3 text-gray-500" />}
              {message.status === "sent" && <CheckCheck className="w-3 h-3 text-gray-500" />}
              {message.status === "delivered" && <CheckCheck className="w-3 h-3 text-blue-500" />}
              {message.status === "read" && <CheckCheck className="w-3 h-3 text-green-500" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
