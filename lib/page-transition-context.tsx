'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ProgressBar } from '@/components/progress-bar'

interface PageTransitionContextType {
  startTransition: (url: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback((url: string) => {
    setIsTransitioning(true)
    router.push(url)
  }, [router])

  // This effect listens for route changes to end the transition
  // In a real app, you might use router.events or a custom loading state
  // based on Next.js's internal router state. For simplicity, we'll simulate.
  React.useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsTransitioning(false)
    }

    // Simulate route change completion after a short delay
    const timeout = setTimeout(() => {
      if (isTransitioning) {
        handleRouteChangeComplete()
      }
    }, 500) // Adjust delay as needed

    return () => clearTimeout(timeout)
  }, [isTransitioning])

  return (
    <PageTransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {isTransitioning && <ProgressBar />}
      {children}
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
