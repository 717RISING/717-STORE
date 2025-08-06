import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import ClientLayout from "@/components/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "717 Store - Ropa Urbana y Exclusiva",
  description: "Descubre la última moda urbana y piezas exclusivas en 717 Store. Estilo, calidad y originalidad en cada prenda.",
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
