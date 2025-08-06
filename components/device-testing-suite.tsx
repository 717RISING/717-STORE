'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import MobileDebugPanel from '@/components/mobile-debug-panel'

export default function DeviceTestingSuite() {
  const { isMobile, isTablet, isDesktop } = useMobileDetection()
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [userAgent, setUserAgent] = useState('')

  useEffect(() => {
    const updateInfo = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
      setUserAgent(navigator.userAgent)
    }

    updateInfo()
    window.addEventListener('resize', updateInfo)
    return () => window.removeEventListener('resize', updateInfo)
  }, [])

  const getDeviceType = () => {
    if (isMobile) return 'Móvil'
    if (isTablet) return 'Tablet'
    if (isDesktop) return 'Escritorio'
    return 'Desconocido'
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Información del Dispositivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
          <p><strong>Tipo de Dispositivo Detectado:</strong> <span className="font-semibold text-[#4A1518] dark:text-[#FFD700]">{getDeviceType()}</span></p>
          <p><strong>Ancho de la Ventana:</strong> {screenWidth}px</p>
          <p><strong>Alto de la Ventana:</strong> {screenHeight}px</p>
          <p className="break-words"><strong>User Agent:</strong> {userAgent}</p>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Pruebas de Interfaz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">Botón Primario</Button>
            <Button variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">Botón Secundario</Button>
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300">Botón Fantasma</Button>
            <Button variant="destructive">Botón Destructivo</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Campo de texto" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
            <Input type="number" placeholder="Campo numérico" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div className="p-4 border border-dashed border-gray-400 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300">
            <p>Este es un bloque de contenido de prueba para verificar el espaciado y la tipografía en diferentes dispositivos.</p>
            <p className="mt-2">Asegúrate de que el texto sea legible y los elementos estén bien alineados.</p>
          </div>
        </CardContent>
      </Card>

      <MobileDebugPanel />
    </div>
  )
}
