'use client'

import { ThemeProvider } from 'next-themes'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/sonner'
import Navigation from '@/components/navigation' // Changed to default import
import Footer from '@/components/footer' // Changed to default import
import { EnhancedChatWidget } from '@/components/live-chat/enhanced-chat-widget'
import { MobileDebugPanel } from '@/components/mobile-debug-panel'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ClientLayoutProps {
  children: ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CartProvider>
          <div className={cn("flex flex-col min-h-screen", isAdminRoute ? "bg-gray-100 dark:bg-gray-900" : "bg-background")}>
            {!isAdminRoute && <Navigation />}
            <main className={cn("flex-1", !isAdminRoute && "pt-16")}> {/* Add padding-top for fixed header */}
              {children}
            </main>
            {!isAdminRoute && <Footer />}
            <Toaster richColors position="top-right" />
            {!isAdminRoute && <EnhancedChatWidget />}
            {/* <MobileDebugPanel /> */} {/* Uncomment to enable mobile debug panel */}
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
