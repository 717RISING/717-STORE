'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { MobileDebugPanel } from './mobile-debug-panel'

export function ResponsiveTest() { // Changed to named export
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0)
  const [orientation, setOrientation] = useState('')
  const [userAgent, setUserAgent] = useState('')
  const [pixelRatio, setPixelRatio] = useState(1)
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  const isMobileHook = useMobileDetection()

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
      setOrientation(window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape')
      setPixelRatio(window.devicePixelRatio)
    }

    handleResize() // Initial set
    window.addEventListener('resize', handleResize)

    setUserAgent(navigator.userAgent)
    setOrientation(window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape')
    setPixelRatio(window.devicePixelRatio)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Responsive Test Suite</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Viewport Dimensions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Width: {width}px</p>
            <p>Height: {height}px</p>
            <p>Orientation: {orientation}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>User Agent: {userAgent.substring(0, 50)}...</p>
            <p>Device Pixel Ratio: {pixelRatio}</p>
            <p>Is Mobile (Hook): {isMobileHook ? 'Yes' : 'No'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Debug Panel</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-2">
            <Switch
              id="debug-panel"
              checked={showDebugPanel}
              onCheckedChange={setShowDebugPanel}
            />
            <Label htmlFor="debug-panel">Show Mobile Debug Panel</Label>
          </CardContent>
        </Card>
      </div>

      {showDebugPanel && <MobileDebugPanel />}

      <h2 className="text-2xl font-bold mt-12 mb-6 text-center">Responsive Test Area</h2>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          Resize your browser window to test responsiveness.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-center">Interactive Elements Test</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Button Test</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Slider Test</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="volume">Volume</Label>
            <Slider
              id="volume"
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-[60%]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
