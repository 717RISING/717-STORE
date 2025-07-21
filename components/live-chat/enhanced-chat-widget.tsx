"use client"

import { useState } from "react"
import { MessageCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatInterface from "./chat-interface"

export default function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const handleToggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
    }
    setIsOpen(!isOpen)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  return (
    <>
      {/* Contact Options */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[998]">
        {/* Phone Button */}
        <Button
          size="sm"
          className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => window.open("tel:+573001234567", "_self")}
        >
          <Phone className="w-5 h-5" />
        </Button>

        {/* Email Button */}
        <Button
          size="sm"
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => window.open("mailto:soporte@717store.com", "_self")}
        >
          <Mail className="w-5 h-5" />
        </Button>

        {/* Chat Button */}
        <Button
          size="sm"
          onClick={handleToggleChat}
          className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
            isOpen || isMinimized
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gradient-to-r from-[#5D1A1D] to-[#8B2635] hover:from-[#6B1E22] hover:to-[#9B2A3A]"
          } text-white`}
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>

      {/* Chat Interface */}
      <ChatInterface isOpen={isOpen} onClose={handleClose} onMinimize={handleMinimize} />
    </>
  )
}
