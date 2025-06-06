import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/lib/theme-context"
import { Toaster } from "@/components/ui/toaster"
import EnhancedChatWidget from "@/components/live-chat/enhanced-chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "717 Store - Streetwear Premium",
  description: "La mejor colección de streetwear y moda urbana",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            <div className="min-h-screen">
              {children}
              <EnhancedChatWidget />
              <Toaster />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
