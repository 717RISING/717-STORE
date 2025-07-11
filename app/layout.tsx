import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import EnhancedChatWidget from "@/components/live-chat/enhanced-chat-widget" // Asegúrate de que esta línea exista

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <PageTransitionProvider>
              {children}
              {/* Asegúrate de que tu footer esté dentro de {children} o en un componente que se renderice antes de EnhancedChatWidget */}
            </PageTransitionProvider>
          </CartProvider>
        </ThemeProvider>
        <EnhancedChatWidget /> {/* Asegúrate de que esta línea esté aquí */}
      </body>
    </html>
  )
}
