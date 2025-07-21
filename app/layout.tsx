import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "717 Store - Ropa Urbana de Calidad",
  description:
    "Descubre la mejor ropa urbana en 717 Store. Camisetas, hoodies y más con diseños únicos y calidad premium.",
  keywords: "ropa urbana, camisetas, hoodies, streetwear, 717 store",
  authors: [{ name: "717 Store" }],
  creator: "717 Store",
  publisher: "717 Store",
  robots: "index, follow",
  openGraph: {
    title: "717 Store - Ropa Urbana de Calidad",
    description:
      "Descubre la mejor ropa urbana en 717 Store. Camisetas, hoodies y más con diseños únicos y calidad premium.",
    url: "https://717store.com",
    siteName: "717 Store",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "717 Store - Ropa Urbana",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "717 Store - Ropa Urbana de Calidad",
    description:
      "Descubre la mejor ropa urbana en 717 Store. Camisetas, hoodies y más con diseños únicos y calidad premium.",
    images: ["/hero-image.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#5D1A1D",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
