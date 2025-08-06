"use client"

import { ThemeProvider } from "@/lib/theme-context"
import { CartProvider } from "@/lib/cart-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import { Toaster } from "@/components/ui/toaster"
import { EnhancedChatWidget } from "@/components/live-chat/enhanced-chat-widget"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <CartProvider>
        <PageTransitionProvider>
          {children}
          <EnhancedChatWidget />
          <Toaster />
        </PageTransitionProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
