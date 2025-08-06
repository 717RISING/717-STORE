'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface PageTransitionContextType {
  startTransition: (url: string) => void
  isTransitioning: boolean
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentPath, setCurrentPath] = useState('')

  const startTransition = useCallback((url: string) => {
    setIsTransitioning(true)
    setCurrentPath(window.location.pathname) // Store current path before navigation
    router.push(url)
  }, [router])

  // Listen for route changes to end the transition
  React.useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsTransitioning(false)
    }

    // Next.js 13+ App Router doesn't have router.events
    // We rely on the component unmount/mount or a global state change
    // For a simple example, we'll just set it to false after a short delay
    // In a real app, you might use a custom loading indicator or a more sophisticated state management
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 500) // Simulate transition duration
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  return (
    <PageTransitionContext.Provider value={{ startTransition, isTransitioning }}>
      <AnimatePresence mode="wait" onExitComplete={() => setIsTransitioning(false)}>
        <motion.div
          key={currentPath} // Use currentPath as key to trigger exit/enter animations
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen flex flex-col" // Ensure it takes full height
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider')
  }
  return context
}
