"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Tablet, Monitor, RotateCcw } from "lucide-react"

interface ResponsiveInfo {
  breakpoint: string
  width: number
  height: number
  orientation: "portrait" | "landscape"
  deviceType: "mobile" | "tablet" | "desktop"
  pixelRatio: number
}

export default function ResponsiveTest() {
  const [info, setInfo] = useState<ResponsiveInfo | null>(null)

  useEffect(() => {
    const updateInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      let breakpoint = "xs"
      let deviceType: "mobile" | "tablet" | "desktop" = "mobile"

      if (width >= 1440) {
        breakpoint = "xl"
        deviceType = "desktop"
      } else if (width >= 1024) {
        breakpoint = "lg"
        deviceType = "desktop"
      } else if (width >= 768) {
        breakpoint = "md"
        deviceType = "tablet"
      } else if (width >= 480) {
        breakpoint = "sm"
        deviceType = "mobile"
      }

      setInfo({
        breakpoint,
        width,
        height,
        orientation: height > width ? "portrait" : "landscape",
        deviceType,
        pixelRatio: window.devicePixelRatio,
      })
    }

    updateInfo()
    window.addEventListener("resize", updateInfo)
    window.addEventListener("orientationchange", updateInfo)

    return () => {
      window.removeEventListener("resize", updateInfo)
      window.removeEventListener("orientationchange", updateInfo)
    }
  }, [])

  if (!info) return null

  const getDeviceIcon = () => {
    switch (info.deviceType) {
      case "mobile":
        return <Smartphone className="w-5 h-5" />
      case "tablet":
        return <Tablet className="w-5 h-5" />
      case "desktop":
        return <Monitor className="w-5 h-5" />
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getDeviceIcon()}
            Responsive Test - Current Breakpoint: {info.breakpoint.toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{info.width}px</div>
              <div className="text-sm text-gray-400">Width</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{info.height}px</div>
              <div className="text-sm text-gray-400">Height</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{info.pixelRatio}x</div>
              <div className="text-sm text-gray-400">Pixel Ratio</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-1">
                <RotateCcw className="w-4 h-4" />
                <Badge variant="outline">{info.orientation}</Badge>
              </div>
              <div className="text-sm text-gray-400">Orientation</div>
            </div>
          </div>

          {/* Grid Test */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Grid Test</h3>
            <div className="grid-responsive grid gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bg-wine-red/20 border border-wine-red rounded-lg p-4 text-center">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Typography Test */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Typography Test</h3>
            <div className="space-y-2">
              <h1 className="text-responsive text-4xl font-bold">Heading 1 - Responsive</h1>
              <h2 className="text-responsive text-3xl font-semibold">Heading 2 - Responsive</h2>
              <p className="text-responsive">Body text that scales responsively across different screen sizes.</p>
            </div>
          </div>

          {/* Button Test */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Button Test</h3>
            <div className="flex flex-wrap gap-2">
              <button className="button-responsive bg-wine-red hover:bg-wine-red-light text-white rounded-lg px-4 py-2 transition-colors">
                Primary Button
              </button>
              <button className="button-responsive border border-wine-red text-wine-red hover:bg-wine-red hover:text-white rounded-lg px-4 py-2 transition-colors">
                Secondary Button
              </button>
            </div>
          </div>

          {/* Spacing Test */}
          <div>
            <h3 className="font-semibold mb-3">Spacing Test</h3>
            <div className="container bg-gray-800 rounded-lg">
              <div className="bg-wine-red/20 rounded">
                <p className="text-sm">Container with responsive padding</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
