import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import EnhancedChatWidget from "@/components/live-chat/enhanced-chat-widget"

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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </CartProvider>
        </ThemeProvider>
        <EnhancedChatWidget /> {/* Colocado aquí para asegurar que esté por encima de todo */}
      </body>
    </html>
  )
}
