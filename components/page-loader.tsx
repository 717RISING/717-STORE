"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { usePageTransition } from '@/lib/page-transition-context' // Assuming this context exists

export function PageLoader() {
  const { isTransitioning } = usePageTransition()
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    if (isTransitioning) {
      // Show loader immediately when transition starts
      setShowLoader(true)
    } else {
      // Hide loader after a small delay to ensure smooth transition out
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 300) // Adjust delay as needed
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

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
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <span className="sr-only">Cargando página...</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
