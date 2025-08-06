"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import { MobileDebugPanel } from "./mobile-debug-panel" // Named import
import { ProgressBar } from "./progress-bar"
import Navigation from "./navigation"
import MobileMenu from "./mobile-menu"
import CartSidebar from "./cart-sidebar"
import ProductSearch from "./product-search"
import ThemeToggle from "./theme-toggle"
import EnhancedChatWidget from "./live-chat/enhanced-chat-widget"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PageTransitionProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <ProgressBar />
            <Navigation />
            <MobileMenu />
            <CartSidebar />
            <ProductSearch />
            <ThemeToggle />
            <main className="flex-1">{children}</main>
            <MobileDebugPanel /> {/* Ensure this is correctly imported and rendered */}
            <EnhancedChatWidget />
          </div>
          <Toaster />
        </CartProvider>
      </PageTransitionProvider>
    </ThemeProvider>
  )
}
