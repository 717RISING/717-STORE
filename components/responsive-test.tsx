"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { cn } from "@/lib/utils"

interface ResponsiveTestProps {
  children: React.ReactNode
}

export function ResponsiveTest({ children }: ResponsiveTestProps) {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)
  const [height, setHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 768)
  const [showControls, setShowControls] = useState(true)
  const [devicePreset, setDevicePreset] = useState("custom")
  const { isMobile: detectedMobile, touchSupport } = useMobileDetection()

  const devicePresets = {
    "custom": { width: width, height: height },
    "iphone-se": { width: 375, height: 667 },
    "iphone-12": { width: 390, height: 844 },
    "ipad-mini": { width: 768, height: 1024 },
    "ipad-pro": { width: 1024, height: 1366 },
    "desktop-sm": { width: 1280, height: 800 },
    "desktop-md": { width: 1440, height: 900 },
    "desktop-lg": { width: 1920, height: 1080 },
  } as const

  useEffect(() => {
    const handleResize = () => {
      if (devicePreset === "custom") {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [devicePreset])

  const applyPreset = (presetKey: keyof typeof devicePresets) => {
    const preset = devicePresets[presetKey]
    setWidth(preset.width)
    setHeight(preset.height)
    setDevicePreset(presetKey)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-950">
      {showControls && (
        <Card className="p-4 shadow-md rounded-none border-b dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Responsive Test Suite
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="width-slider" className="text-gray-700 dark:text-gray-300">
                Width: {width}px
              </Label>
              <Slider
                id="width-slider"
                min={200}
                max={2000}
                step={1}
                value={[width]}
                onValueChange={([val]) => {
                  setWidth(val)
                  setDevicePreset("custom")
                }}
                className="[&>span:first-child]:h-2 [&>span:first-child]:bg-gray-300 dark:[&>span:first-child]:bg-gray-700 [&>span:first-child>span]:bg-[#5D1A1D] dark:[&>span:first-child>span]:bg-[#6B1E22]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="height-slider" className="text-gray-700 dark:text-gray-300">
                Height: {height}px
              </Label>
              <Slider
                id="height-slider"
                min={200}
                max={1500}
                step={1}
                value={[height]}
                onValueChange={([val]) => {
                  setHeight(val)
                  setDevicePreset("custom")
                }}
                className="[&>span:first-child]:h-2 [&>span:first-child]:bg-gray-300 dark:[&>span:first-child]:bg-gray-700 [&>span:first-child>span]:bg-[#5D1A1D] dark:[&>span:first-child>span]:bg-[#6B1E22]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="device-preset" className="text-gray-700 dark:text-gray-300">
                Device Presets
              </Label>
              <Select value={devicePreset} onValueChange={applyPreset}>
                <SelectTrigger id="device-preset" className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Select a preset" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="iphone-se">iPhone SE (375x667)</SelectItem>
                  <SelectItem value="iphone-12">iPhone 12 (390x844)</SelectItem>
                  <SelectItem value="ipad-mini">iPad Mini (768x1024)</SelectItem>
                  <SelectItem value="ipad-pro">iPad Pro (1024x1366)</SelectItem>
                  <SelectItem value="desktop-sm">Desktop Small (1280x800)</SelectItem>
                  <SelectItem value="desktop-md">Desktop Medium (1440x900)</SelectItem>
                  <SelectItem value="desktop-lg">Desktop Large (1920x1080)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 col-span-full md:col-span-1">
              <Switch
                id="show-controls"
                checked={showControls}
                onCheckedChange={setShowControls}
                className="data-[state=checked]:bg-[#5D1A1D] data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-700"
              />
              <Label htmlFor="show-controls" className="text-gray-700 dark:text-gray-300">
                Show Controls
              </Label>
            </div>
            <div className="col-span-full md:col-span-2 text-gray-700 dark:text-gray-300">
              <p>Detected Mobile: {detectedMobile ? "Yes" : "No"}</p>
              <p>Touch Support: {touchSupport ? "Yes" : "No"}</p>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <div
          style={{ width: `${width}px`, height: `${height}px` }}
          className={cn(
            "relative border-8 border-gray-800 dark:border-gray-200 rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300",
            !showControls && "border-none rounded-none"
          )}
        >
          <div className="absolute inset-0 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
