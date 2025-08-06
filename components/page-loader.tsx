'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface PageLoaderProps {
  isLoading: boolean
}

export default function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
        >
          <Loader2 className="h-12 w-12 animate-spin text-[#4A1518] dark:text-[#FFD700]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
