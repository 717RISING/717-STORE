'use client'

import { ThemeProvider } from 'next-themes'
import { CartProvider } from '@/lib/cart-context'
import { PageTransitionProvider } from '@/lib/page-transition-context'
import { MobileDebugPanel } from './mobile-debug-panel'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useMobileDetection()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <PageTransitionProvider>
          {children}
          {isMobile && <MobileDebugPanel />}
        </PageTransitionProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
