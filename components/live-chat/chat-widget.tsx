"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageSquare } from 'lucide-react'
import ChatInterface from "./chat-interface"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

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
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col bg-gray-900 text-white">
        <SheetHeader className="p-4 border-b border-gray-700">
          <SheetTitle className="text-white">Soporte en Vivo</SheetTitle>
        </SheetHeader>
        <ChatInterface />
      </SheetContent>
    </Sheet>
  )
}
