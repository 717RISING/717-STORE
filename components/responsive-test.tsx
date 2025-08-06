'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Smartphone, Tablet, Monitor, Wifi, WifiOff } from 'lucide-react'

export function ResponsiveTest() {
  const [screenSize, setScreenSize] = useState('')
  const [isOnline, setIsOnline] = useState(true)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      setViewport({ width, height: window.innerHeight })
      
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

  const getIcon = () => {
    switch (screenSize) {
      case 'Mobile':
        return <Smartphone className="h-5 w-5" />
      case 'Tablet':
        return <Tablet className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getIcon()}
              Responsive Design Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Screen Size</h3>
                <Badge variant={screenSize === 'Mobile' ? 'default' : 'secondary'}>
                  {screenSize}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Viewport</h3>
                <p className="text-sm text-muted-foreground">
                  {viewport.width} × {viewport.height}
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Connection</h3>
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-3"></div>
              <h3 className="font-semibold mb-2">Test Card {i + 1}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                This is a test card to verify responsive behavior across different screen sizes.
              </p>
              <Button size="sm" className="w-full">
                Action
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
