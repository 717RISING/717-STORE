'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ProgressBar } from '@/components/progress-bar'

interface PageTransitionContextType {
  startTransition: (href: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)

  const startTransition = useCallback((href: string) => {
    setIsTransitioning(true)
    setProgress(0) // Reset progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return prev
        }
        return prev + 10
      })
    }, 100)

    router.push(href)

    // Simulate completion after a short delay, or integrate with actual route change events
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        setIsTransitioning(false)
        setProgress(0)
      }, 300) // Small delay to show 100%
    }, 1000) // Adjust based on typical page load time

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [router])

  return (
    <PageTransitionContext.Provider value={{ startTransition, isTransitioning }}>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
          >
            <ProgressBar progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (context === undefined) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider")
  }
  return context
}
