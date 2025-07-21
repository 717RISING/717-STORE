"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { PageTransitionProvider } from "@/lib/page-transition-context"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"
import EnhancedChatWidget from "@/components/live-chat/enhanced-chat-widget"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <PageTransitionProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main>{children}</main>
            <footer className="bg-black text-white py-12 mt-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">717 STORE</h3>
                    <p className="text-gray-400 text-sm">Streetwear auténtico para la nueva generación.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">NAVEGACIÓN</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <a href="/" className="hover:text-white transition-colors">
                          Inicio
                        </a>
                      </li>
                      <li>
                        <a href="/productos" className="hover:text-white transition-colors">
                          Productos
                        </a>
                      </li>
                      <li>
                        <a href="/contacto" className="hover:text-white transition-colors">
                          Contacto
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">AYUDA</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <a href="/envios-devoluciones" className="hover:text-white transition-colors">
                          Envíos y Devoluciones
                        </a>
                      </li>
                      <li>
                        <a href="/tallas" className="hover:text-white transition-colors">
                          Guía de tallas
                        </a>
                      </li>
                      <li>
                        <a href="/terminos" className="hover:text-white transition-colors">
                          Términos y Condiciones
                        </a>
                      </li>
                      <li>
                        <a href="/privacidad" className="hover:text-white transition-colors">
                          Política de Privacidad
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">SÍGUENOS</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a href="#" className="hover:text-white transition-colors">
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                  © 2024 717 Store. Todos los derechos reservados.
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
          <EnhancedChatWidget />
        </PageTransitionProvider>
      </CartProvider>
    </ThemeProvider>
  )
}
