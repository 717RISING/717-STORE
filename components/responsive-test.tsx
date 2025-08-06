"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Smartphone, Tablet, Monitor, Wifi, WifiOff } from 'lucide-react'

interface DeviceInfo {
  width: number
  height: number
  deviceType: string
  orientation: string
  pixelRatio: number
  userAgent: string
  isOnline: boolean
  touchSupport: boolean
}

export function ResponsiveTest() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [breakpoint, setBreakpoint] = useState('')

  useEffect(() => {
    setIsClient(true)
    updateDeviceInfo()
    updateDimensions()
    
    const handleResize = () => {
      updateDeviceInfo()
      updateDimensions()
    }
    const handleOnline = () => updateDeviceInfo()
    const handleOffline = () => updateDeviceInfo()

    window.addEventListener('resize', handleResize)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const updateDeviceInfo = () => {
    if (typeof window === 'undefined') return

    const width = window.innerWidth
    const height = window.innerHeight
    
    let deviceType = 'Desktop'
    if (width < 768) deviceType = 'Mobile'
    else if (width < 1024) deviceType = 'Tablet'

    const orientation = width > height ? 'Landscape' : 'Portrait'
    
    setDeviceInfo({
      width,
      height,
      deviceType,
      orientation,
      pixelRatio: window.devicePixelRatio || 1,
      userAgent: navigator.userAgent,
      isOnline: navigator.onLine,
      touchSupport: 'ontouchstart' in window
    })
  }

  const updateDimensions = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)

    if (window.innerWidth < 640) {
      setBreakpoint('sm (Móvil)')
    } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
      setBreakpoint('md (Tablet)')
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      setBreakpoint('lg (Escritorio Pequeño)')
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      setBreakpoint('xl (Escritorio Mediano)')
    } else {
      setBreakpoint('2xl (Escritorio Grande)')
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Mobile':
        return <Smartphone className="h-5 w-5" />
      case 'Tablet':
        return <Tablet className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  if (!isClient || !deviceInfo) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const bpInfo = getBreakpointInfo(deviceInfo.width)

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            {getDeviceIcon(deviceInfo.deviceType)}
            Información del Dispositivo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Tipo:</span>
                <Badge variant="outline">{deviceInfo.deviceType}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dimensiones:</span>
                <span>{deviceInfo.width} × {deviceInfo.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Orientación:</span>
                <span>{deviceInfo.orientation}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pixel Ratio:</span>
                <span>{deviceInfo.pixelRatio}x</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Conexión:</span>
                <div className="flex items-center gap-1">
                  {deviceInfo.isOnline ? (
                    <>
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4 text-red-500" />
                      <span className="text-red-500">Offline</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Touch:</span>
                <Badge variant={deviceInfo.touchSupport ? "default" : "secondary"}>
                  {deviceInfo.touchSupport ? "Soportado" : "No soportado"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Breakpoint:</span>
                <Badge className={`${bpInfo.color} text-white`}>
                  {bpInfo.name}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <span className="font-medium">User Agent:</span>
            <p className="text-xs text-gray-600 mt-1 break-all">
              {deviceInfo.userAgent}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Button className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">Botón de Prueba</Button>
            <Input placeholder="Campo de entrada" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>

          <div className="p-4 border border-dashed border-gray-400 dark:border-gray-600 rounded-md mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contenido de Prueba</h3>
            <p>
              Este es un párrafo de texto para probar cómo se ajusta el contenido en diferentes tamaños de pantalla.
              Asegúrate de que el texto sea legible y que los elementos no se superpongan.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Elemento de lista 1</li>
              <li>Elemento de lista 2</li>
              <li>Elemento de lista 3</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Breakpoint Visualization */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Breakpoints de Tailwind CSS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'xs', min: 0, max: 639, color: 'bg-red-500' },
              { name: 'sm', min: 640, max: 767, color: 'bg-orange-500' },
              { name: 'md', min: 768, max: 1023, color: 'bg-yellow-500' },
              { name: 'lg', min: 1024, max: 1279, color: 'bg-green-500' },
              { name: 'xl', min: 1280, max: 1535, color: 'bg-blue-500' },
              { name: '2xl', min: 1536, max: Infinity, color: 'bg-purple-500' }
            ].map((bp) => (
              <div 
                key={bp.name}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  deviceInfo.width >= bp.min && deviceInfo.width <= bp.max
                    ? `${bp.color} text-white`
                    : 'bg-gray-100'
                }`}
              >
                <span className="font-medium">{bp.name}</span>
                <span className="text-sm">
                  {bp.min}px - {bp.max === Infinity ? '∞' : `${bp.max}px`}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Actions */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Acciones de Prueba</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => updateDeviceInfo()}>
              Actualizar Info
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Recargar Página
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen()
                } else {
                  document.documentElement.requestFullscreen()
                }
              }}
            >
              Toggle Fullscreen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const getBreakpointInfo = (width: number) => {
  if (width < 640) return { name: 'xs', color: 'bg-red-500' }
  if (width < 768) return { name: 'sm', color: 'bg-orange-500' }
  if (width < 1024) return { name: 'md', color: 'bg-yellow-500' }
  if (width < 1280) return { name: 'lg', color: 'bg-green-500' }
  if (width < 1536) return { name: 'xl', color: 'bg-blue-500' }
  return { name: '2xl', color: 'bg-purple-500' }
}

export default ResponsiveTest
