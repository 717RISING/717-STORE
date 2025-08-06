'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from './loading-spinner'

interface PageLoaderProps {
  isLoading: boolean;
}

export function PageLoader({ isLoading }: PageLoaderProps) {
  const [showLoader, setShowLoader] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true)
    } else {
      const timer = setTimeout(() => setShowLoader(false), 300) // Delay hiding to allow animation
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <LoadingSpinner size="lg" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
