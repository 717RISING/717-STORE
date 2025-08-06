import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-context" // Assuming ThemeProvider is a named export
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/lib/cart-context" // Assuming CartProvider is a named export
import { AuthProvider } from "@/lib/auth-context" // Assuming AuthProvider is a named export
import { PageTransitionProvider } from "@/lib/page-transition-context" // Assuming PageTransitionProvider is a named export
import { PageLoader } from "@/components/page-loader" // Assuming PageLoader is a named export
import { ProgressBar } from "@/components/progress-bar" // Assuming ProgressBar is a named export
import { Navigation } from "@/components/navigation" // Assuming Navigation is a named export
import { EnhancedChatWidget } from "@/components/live-chat/enhanced-chat-widget" // Assuming EnhancedChatWidget is a named export
import Footer from "@/components/footer" // Assuming Footer is a default export

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "717 Store - Ropa Urbana y Streetwear",
  description: "Descubre la última moda urbana y streetwear en 717 Store. Prendas exclusivas y de alta calidad para tu estilo.",
  keywords: ["ropa urbana", "streetwear", "moda", "tienda de ropa", "717 Store", "camisetas", "pantalones", "chaquetas"],
  authors: [{ name: "717 Store" }],
  creator: "717 Store",
  publisher: "Vercel",
  openGraph: {
    title: "717 Store - Ropa Urbana y Streetwear",
    description: "Descubre la última moda urbana y streetwear en 717 Store. Prendas exclusivas y de alta calidad para tu estilo.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://717store.com",
    siteName: "717 Store",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.jpg`, // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "717 Store - Ropa Urbana y Streetwear",
      },
    ],
    locale: "es_LA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "717 Store - Ropa Urbana y Streetwear",
    description: "Descubre la última moda urbana y streetwear en 717 Store. Prendas exclusivas y de alta calidad para tu estilo.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/twitter-image.jpg`], // Replace with your actual Twitter image
  },
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
          <PageTransitionProvider>
            <AuthProvider>
              <CartProvider>
                <ProgressBar />
                <PageLoader />
                <Navigation />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <EnhancedChatWidget />
                <Toaster />
              </CartProvider>
            </AuthProvider>
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
