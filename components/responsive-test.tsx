"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Smartphone, Tablet, Monitor, Wifi, WifiOff } from 'lucide-react'

export function ResponsiveTest() {
  const [screenSize, setScreenSize] = useState('')
  const [isOnline, setIsOnline] = useState(true)
  const [deviceInfo, setDeviceInfo] = useState({
    width: 0,
    height: 0,
    userAgent: '',
    pixelRatio: 1
  })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      setDeviceInfo({
        width,
        height: window.innerHeight,
        userAgent: navigator.userAgent,
        pixelRatio: window.devicePixelRatio || 1
      })

      if (width < 640) {
        setScreenSize('Mobile')
      } else if (width < 1024) {
        setScreenSize('Tablet')
      } else {
        setScreenSize('Desktop')
      }
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('resize', updateScreenSize)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const getDeviceIcon = () => {
    switch (screenSize) {
      case 'Mobile':
        return <Smartphone className="h-5 w-5" />
      case 'Tablet':
        return <Tablet className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  const getBreakpointColor = () => {
    switch (screenSize) {
      case 'Mobile':
        return 'bg-red-500'
      case 'Tablet':
        return 'bg-yellow-500'
      default:
        return 'bg-green-500'
    }
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getDeviceIcon()}
              Responsive Design Test
              <Badge className={getBreakpointColor()}>
                {screenSize}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Screen Size</h3>
                <p className="text-sm text-muted-foreground">
                  {deviceInfo.width} x {deviceInfo.height}px
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Device Pixel Ratio</h3>
                <p className="text-sm text-muted-foreground">
                  {deviceInfo.pixelRatio}x
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  Connection
                  {isOnline ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Mobile (< 640px)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600">
                Single column layout, touch-friendly buttons
              </p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-700">Tablet (640px - 1024px)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-600">
                Two column layout, medium spacing
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Desktop (> 1024px)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600">
                Multi-column layout, hover effects
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small Button</Button>
              <Button>Default Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground break-all">
              {deviceInfo.userAgent}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
