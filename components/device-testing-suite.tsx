"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function DeviceTestingSuite() {
  const [device, setDevice] = useState('desktop')
  const [orientation, setOrientation] = useState('portrait')

  const getDeviceStyles = () => {
    switch (device) {
      case 'mobile':
        return orientation === 'portrait' ? 'w-[375px] h-[667px]' : 'w-[667px] h-[375px]'
      case 'tablet':
        return orientation === 'portrait' ? 'w-[768px] h-[1024px]' : 'w-[1024px] h-[768px]'
      case 'laptop':
        return 'w-[1280px] h-[800px]'
      case 'desktop':
      default:
        return 'w-full h-[calc(100vh-200px)]' // Adjust height for desktop view
    }
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Suite de Pruebas de Dispositivos</h1>

      <Card className="w-full max-w-4xl mb-8 p-6">
        <CardHeader>
          <CardTitle>Controles de Dispositivo</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="device-select">Seleccionar Dispositivo</Label>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger id="device-select">
                <SelectValue placeholder="Selecciona un dispositivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile">Móvil (iPhone 8)</SelectItem>
                <SelectItem value="tablet">Tablet (iPad)</SelectItem>
                <SelectItem value="laptop">Laptop (MacBook Air)</SelectItem>
                <SelectItem value="desktop">Escritorio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(device === 'mobile' || device === 'tablet') && (
            <div className="space-y-2">
              <Label htmlFor="orientation-select">Orientación</Label>
              <Select value={orientation} onValueChange={setOrientation}>
                <SelectTrigger id="orientation-select">
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

      <div
        className={cn(
          "relative border-8 border-gray-800 dark:border-gray-200 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out",
          getDeviceStyles(),
          device !== 'desktop' && 'flex-shrink-0' // Prevent shrinking for fixed size devices
        )}
        style={{
          maxWidth: device === 'desktop' ? '100%' : getDeviceStyles().split(' ')[0],
          maxHeight: device === 'desktop' ? 'none' : getDeviceStyles().split(' ')[1],
        }}
      >
        <iframe
          src="/" // Replace with the actual URL of your application to test
          className="w-full h-full border-none bg-white dark:bg-black"
          title="Device Test Frame"
        />
      </div>
    </div>
  )
}
