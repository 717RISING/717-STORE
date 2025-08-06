"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionContextType {
  startTransition: () => void
  endTransition: () => void
  isTransitioning: boolean
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const endTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  // Optional: You might want to trigger endTransition when route changes
  // useEffect(() => {
  //   setIsTransitioning(false);
  // }, [pathname]);

  return (
    <PageTransitionContext.Provider value={{ startTransition, endTransition, isTransitioning }}>
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
