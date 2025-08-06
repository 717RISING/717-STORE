'use client'

import { ThemeProvider } from 'next-themes'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/sonner'
import Navigation from '@/components/navigation' // Changed to default import
import Footer from '@/components/footer' // Changed to default import
import { ChatWidget } from '@/components/live-chat/chat-widget'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ChatWidget />
            <Toaster richColors position="bottom-right" />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
