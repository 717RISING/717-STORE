"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react'
import ChatInterface from "./chat-interface"

export default function EnhancedChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-[#4A1518] hover:bg-[#6B1E22] text-white shadow-lg"
          aria-label="Open chat widget"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className={`p-0 flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out ${
          isMinimized ? "w-20 h-20 rounded-full overflow-hidden" : "w-full sm:w-[400px] h-full"
        }`}
      >
        {!isMinimized && (
          <SheetHeader className="p-4 border-b border-gray-700 flex flex-row items-center justify-between">
            <SheetTitle className="text-white">Soporte en Vivo</SheetTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMinimize} aria-label="Minimize chat">
                {isMinimized ? <Maximize2 className="h-5 w-5 text-white" /> : <Minimize2 className="h-5 w-5 text-white" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X className="h-5 w-5 text-white" />
              </Button>
            </div>
          </SheetHeader>
        )}
        {!isMinimized && <ChatInterface />}
      </SheetContent>
    </Sheet>
  )
}
