import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import { Toaster } from "@/components/ui/toaster"
import EnhancedChatWidget from "@/components/live-chat/enhanced-chat-widget" // Import the chat widget

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "717 Store",
  description: "Streetwear auténtico para la nueva generación.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            <PageTransitionProvider>
              {children}
              <Toaster />
              <EnhancedChatWidget /> {/* Render the chat widget here */}
            </PageTransitionProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
