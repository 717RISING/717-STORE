"use client"

import type React from "react"

import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/lib/theme-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import PageTransition from "./page-transition"
import ProgressBar from "./progress-bar"
import EnhancedChatWidget from "./live-chat/enhanced-chat-widget"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <PageTransitionProvider>
          <ProgressBar />
          <PageTransition>{children}</PageTransition>
          <EnhancedChatWidget />
        </PageTransitionProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
