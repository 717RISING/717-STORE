"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { ChatMessage as ChatMessageType } from "@/hooks/use-chat"

interface ChatMessageProps {
  message: ChatMessageType
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[250px] sm:max-w-xs lg:max-w-md rounded-lg p-2 sm:p-3 break-words ${
          isUser ? "bg-[#5D1A1D] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        }`}
      >
        <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
        <p className={`text-xs mt-1 opacity-70 ${isUser ? "text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
          {format(message.timestamp, "HH:mm", { locale: es })}
        </p>
      </div>
    </div>
  )
}
