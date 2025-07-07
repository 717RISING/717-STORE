"use client"

import type React from "react"

import { ThemeProvider } from "@/lib/theme-context"
import { CartProvider } from "@/lib/cart-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import Navigation from "@/components/navigation"
import MobileDebugPanel from "@/components/mobile-debug-panel"
import { useEffect, useState } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showDebug, setShowDebug] = useState(false)

  useEffect(() => {
    // Show debug panel only on mobile devices or when in development
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isDev = process.env.NODE_ENV === "development"
    setShowDebug(isMobile || isDev)
  }, [])

  return (
    <ThemeProvider>
      <CartProvider>
        <PageTransitionProvider>
          <Navigation />
          {children}
          {showDebug && <MobileDebugPanel />}
        </PageTransitionProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
