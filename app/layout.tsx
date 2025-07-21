import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "@/components/client-layout"

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
