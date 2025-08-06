"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { cn } from "@/lib/utils"
import { Settings, X, Smartphone, Tablet, Monitor } from 'lucide-react'

interface MobileDebugPanelProps {
  className?: string
}

export function MobileDebugPanel({ className }: MobileDebugPanelProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { isMobile, isTablet, isDesktop } = useMobileDetection()

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    if (typeof window !== "undefined") {
      updateDimensions() // Set initial dimensions
      window.addEventListener("resize", updateDimensions)
      return () => window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  if (!isMobile) {
    return null // Only show on mobile devices
  }

  const getDeviceIcon = () => {
    if (isMobile) return <Smartphone className="h-5 w-5 text-blue-400" />
    if (isTablet) return <Tablet className="h-5 w-5 text-green-400" />
    if (isDesktop) return <Monitor className="h-5 w-5 text-purple-400" />
    return <Settings className="h-5 w-5 text-gray-400" />
  }

  const getDeviceType = () => {
    if (isMobile) return "Mobile"
    if (isTablet) return "Tablet"
    if (isDesktop) return "Desktop"
    return "Unknown"
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-[#5D1A1D] hover:bg-[#6B1E22] text-white"
        aria-label="Toggle Debug Panel"
      >
        {isVisible ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
      </Button>

      {isVisible && (
        <Card className="absolute bottom-16 right-0 w-64 bg-white dark:bg-gray-900 shadow-xl rounded-lg">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              {getDeviceIcon()} Mobile Debug
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
              <span>Width:</span>
              <span className="font-semibold">{dimensions.width}px</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-200 dark:border-gray-700">
              <span>Height:</span>
              <span className="font-semibold">{dimensions.height}px</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Device:</span>
              <span className="font-semibold">{getDeviceType()}</span>
            </div>
            {/* Add more debug options as needed */}
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="dark-mode-toggle">Modo Oscuro</Label>
              <Switch id="dark-mode-toggle" /* Add dark mode logic here */ />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
