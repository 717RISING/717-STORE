'use client'

import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ChatInterface from './chat-interface'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 bg-[#4A1518] hover:bg-[#6B1E22] text-white rounded-full p-4 shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        <span className="sr-only">{isOpen ? 'Cerrar Chat' : 'Abrir Chat'}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 z-50 w-full max-w-sm h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col border border-gray-200 dark:border-gray-700"
          >
            <ChatInterface onClose={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
