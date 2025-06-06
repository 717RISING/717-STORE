"use client"

import type React from "react"
import { useState, useEffect } from "react"
import ChatLoader from "@/components/loaders/chat-loader"

type EnhancedChatWidgetProps = {}

interface Message {
  sender: "user" | "agent"
  text: string
}

const EnhancedChatWidget: React.FC<EnhancedChatWidgetProps> = ({/* props */}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chatState, setChatState] = useState<"connecting" | "connected" | "disconnected">("connecting")
  const [isAgentTyping, setIsAgentTyping] = useState(false)

  useEffect(() => {
    // Simulate connecting to a chat service
    const connectTimeout = setTimeout(() => {
      setChatState("connected")
    }, 2000)

    // Simulate agent typing
    const typingTimeout = setTimeout(() => {
      setIsAgentTyping(true)
      setTimeout(() => {
        setIsAgentTyping(false)
      }, 1500)
    }, 4000)

    return () => {
      clearTimeout(connectTimeout)
      clearTimeout(typingTimeout)
    }
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "user", text: newMessage }])
      setNewMessage("")

      // Simulate agent response
      setTimeout(() => {
        setMessages([
          ...messages,
          { sender: "user", text: newMessage },
          { sender: "agent", text: "Thank you for your message!" },
        ])
      }, 1000)
    }
  }

  return (
    <div className="border rounded shadow-md p-4 w-96">
      <h2 className="text-lg font-semibold mb-2">Live Chat</h2>

      {chatState === "connecting" && (
        <div className="p-4">
          <ChatLoader size="md" status="connecting" />
        </div>
      )}

      {/* Chat messages display */}
      <div className="mb-2 h-48 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`mb-1 ${message.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded ${message.sender === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>

      {isAgentTyping && (
        <div className="p-2">
          <ChatLoader size="sm" status="typing" />
        </div>
      )}

      {/* Input and send button */}
      {chatState === "connected" && (
        <div className="flex">
          <input
            type="text"
            className="flex-grow border rounded p-2 mr-2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="bg-blue-500 text-white rounded p-2" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      )}

      {chatState === "disconnected" && <p>Disconnected from chat.</p>}
    </div>
  )
}

export default EnhancedChatWidget
