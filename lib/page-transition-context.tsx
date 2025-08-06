"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Import NProgress CSS

interface PageTransitionContextType {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
    NProgress.start()
  }, [])

  const endTransition = useCallback(() => {
    setIsTransitioning(false)
    NProgress.done()
  }, [])

  useEffect(() => {
    // This effect handles route changes initiated by Next.js Link or router.push/replace
    const handleRouteChangeStart = (url: string) => {
      if (url !== pathname) {
        startTransition()
      }
    }

    const handleRouteChangeComplete = () => {
      endTransition()
    }

    const handleRouteChangeError = () => {
      endTransition()
    }

    // NProgress configuration (optional, can be moved to a separate file)
    NProgress.configure({ showSpinner: false, trickleSpeed: 200, minimum: 0.1 });

    // Attach event listeners for Next.js router events
    // Note: In App Router, these events are not directly exposed as in Pages Router.
    // We simulate it by tracking pathname changes and using a global loading indicator.
    // For a more robust solution, consider a custom router wrapper or a library.

    // For now, we'll rely on the pathname change to trigger the transition state.
    // The actual NProgress start/done will be managed by the ProgressBar component
    // which listens to router events (if available) or simply by the PageLoader.

    // This context primarily manages the `isTransitioning` state for child components.
    // The ProgressBar component will handle the visual progress bar.

    return () => {
      // Clean up if necessary, though for App Router, direct router events are less common.
    }
  }, [pathname, startTransition, endTransition])

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
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
