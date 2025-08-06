'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Bug } from 'lucide-react'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { AnimatePresence, motion } from 'framer-motion'

export function MobileDebugPanel() { // Changed to named export
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobileDetection()

  if (!isMobile) {
    return null // Only show on mobile devices
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-2"
          >
            <Card className="w-64">
              <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
                <CardTitle className="text-lg">Debug Móvil</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Cerrar panel de depuración">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 text-sm space-y-2">
                <p><strong>Dispositivo:</strong> Móvil</p>
                <p><strong>Ancho de Pantalla:</strong> {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px</p>
                <p><strong>Alto de Pantalla:</strong> {typeof window !== 'undefined' ? window.innerHeight : 'N/A'}px</p>
                <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
                <Button asChild variant="outline" className="w-full mt-2">
                  <a href="/test-responsive">Ir a Test Responsivo</a>
                </Button>
                <Button asChild variant="outline" className="w-full mt-2">
                  <a href="/device-test">Ir a Test de Dispositivos</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        className="rounded-full w-14 h-14 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar panel de depuración" : "Abrir panel de depuración"}
      >
        <Bug className="w-6 h-6" />
      </Button>
    </div>
  )
}
