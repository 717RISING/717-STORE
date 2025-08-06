"use client"

import { Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === 'user'
            ? 'bg-primary text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
        }`}
      >
        <div className="flex items-start space-x-2">
          {message.sender === 'bot' && (
            <Bot className="h-4 w-4 mt-0.5 text-primary" />
          )}
          {message.sender === 'user' && (
            <User className="h-4 w-4 mt-0.5" />
          )}
          <p className="text-sm">{message.text}</p>
        </div>
        <p className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  )
}
