import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navigation from '@/components/navigation'
import { CartProvider } from '@/lib/cart-context'
import ClientLayout from '@/components/client-layout' // Import the client layout

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '717 Store',
  description: 'Tu tienda de ropa urbana y streetwear',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <ClientLayout> {/* Wrap children with ClientLayout */}
              <Navigation />
              <main className="flex-grow">
                {children}
              </main>
            </ClientLayout>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
