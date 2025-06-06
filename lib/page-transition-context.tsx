"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

type TransitionType = "fade" | "slide" | "zoom" | "flip" | "default"

interface PageTransitionContextType {
  isLoading: boolean
  transitionType: TransitionType
  setTransitionType: (type: TransitionType) => void
  setIsLoading: (loading: boolean) => void
  progress: number
  setProgress: (progress: number) => void
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [transitionType, setTransitionType] = useState<TransitionType>("default")
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    setProgress(0)

    // Simulate loading progress
    const timer = setTimeout(() => {
      setProgress(30)
    }, 100)

    const timer2 = setTimeout(() => {
      setProgress(70)
    }, 300)

    const timer3 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [pathname])

  return (
    <PageTransitionContext.Provider
      value={{
        isLoading,
        transitionType,
        setTransitionType,
        setIsLoading,
        progress,
        setProgress,
      }}
    >
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
