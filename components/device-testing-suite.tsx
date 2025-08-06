'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { MobileDebugPanel } from './mobile-debug-panel' // Changed to named import

export function DeviceTestingSuite() {
  const [device, setDevice] = useState('desktop')
  const [orientation, setOrientation] = useState('portrait')
  const isMobileHook = useMobileDetection()

  const getFrameClasses = () => {
    let classes = "border-4 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-xl transition-all duration-300 ease-in-out mx-auto"
    if (device === 'mobile') {
      classes += orientation === 'portrait' ? " w-[375px] h-[667px]" : " w-[667px] h-[375px]"
    } else if (device === 'tablet') {
      classes += orientation === 'portrait' ? " w-[768px] h-[1024px]" : " w-[1024px] h-[768px]"
    } else { // desktop
      classes += " w-full max-w-[1200px] h-[700px]"
    }
    return classes
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Suite de Pruebas de Dispositivos</h1>

      <Card className="w-full max-w-4xl mb-8">
        <CardHeader>
          <CardTitle>Controles de Dispositivo</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="device-select">Seleccionar Dispositivo</Label>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger id="device-select" className="w-full">
                <SelectValue placeholder="Selecciona un dispositivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop">Escritorio</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="mobile">Móvil</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {device !== 'desktop' && (
            <div>
              <Label htmlFor="orientation-select">Orientación</Label>
              <Select value={orientation} onValueChange={setOrientation}>
                <SelectTrigger id="orientation-select" className="w-full">
                  <SelectValue placeholder="Selecciona orientación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Vertical</SelectItem>
                  <SelectItem value="landscape">Horizontal</SelectItem>
                </SelectContent>
            </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <div className={cn("relative", getFrameClasses())}>
        <iframe
          src="/" // Load your application here
          className="w-full h-full border-none"
          title="Device Test Frame"
        />
        {isMobileHook && <MobileDebugPanel />}
      </div>

      <p className="mt-8 text-gray-600 dark:text-gray-400 text-center">
        Utiliza esta suite para probar la responsividad de tu aplicación en diferentes tamaños y orientaciones de pantalla.
      </p>
    </div>
  )
}
