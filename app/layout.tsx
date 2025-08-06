import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer" // Corrected import to default
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import { EnhancedChatWidget } from "@/components/live-chat/enhanced-chat-widget"
import { MobileDebugPanel } from "@/components/mobile-debug-panel"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "717 Store",
  description: "Tu destino para el streetwear más auténtico y las últimas tendencias.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <PageTransitionProvider>
                <div className="flex flex-col min-h-screen">
                  <Navigation />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                  <EnhancedChatWidget />
                  <MobileDebugPanel />
                </div>
              </PageTransitionProvider>
            </CartProvider>
          </AuthProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
