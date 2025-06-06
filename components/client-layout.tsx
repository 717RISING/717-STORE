"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/lib/theme-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import { Toaster } from "@/components/ui/toaster"
import EnhancedChatWidget from "@/components/live-chat/enhanced-chat-widget"
import PageTransition from "@/components/page-transition"
import ProgressBar from "@/components/progress-bar"
import BrandLoader from "@/components/loaders/brand-loader"
import { useState, useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // Simular carga inicial de la aplicación
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isInitialLoading) {
    return (
      <div className={`${inter.className} bg-black min-h-screen flex items-center justify-center`}>
        <BrandLoader size="lg" message="Iniciando experiencia 717..." />
      </div>
    )
  }

  return (
    <div className={inter.className}>
      <ThemeProvider>
        <PageTransitionProvider>
          <CartProvider>
            <div className="min-h-screen">
              <ProgressBar />
              <PageTransition>{children}</PageTransition>
              <EnhancedChatWidget />
              <Toaster />
            </div>
          </CartProvider>
        </PageTransitionProvider>
      </ThemeProvider>
    </div>
  )
}
