"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Tablet, Monitor, Wifi, Battery, Signal } from "lucide-react"

interface DeviceInfo {
  userAgent: string
  platform: string
  deviceType: "mobile" | "tablet" | "desktop"
  deviceModel: string
  browser: string
  browserVersion: string
  screenWidth: number
  screenHeight: number
  devicePixelRatio: number
  orientation: "portrait" | "landscape"
  touchSupport: boolean
  connectionType: string
  batteryLevel?: number
  isOnline: boolean
}

interface ViewportTest {
  name: string
  width: number
  height: number
  devicePixelRatio: number
  icon: React.ReactNode
}

const DEVICE_PRESETS: ViewportTest[] = [
  {
    name: "iPhone SE",
    width: 375,
    height: 667,
    devicePixelRatio: 2,
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    name: "iPhone 12/13/14",
    width: 390,
    height: 844,
    devicePixelRatio: 3,
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    name: "iPhone 14 Pro Max",
    width: 430,
    height: 932,
    devicePixelRatio: 3,
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    name: "Samsung Galaxy S21",
    width: 384,
    height: 854,
    devicePixelRatio: 2.75,
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    name: "iPad",
    width: 768,
    height: 1024,
    devicePixelRatio: 2,
    icon: <Tablet className="w-4 h-4" />,
  },
  {
    name: "iPad Pro",
    width: 1024,
    height: 1366,
    devicePixelRatio: 2,
    icon: <Tablet className="w-4 h-4" />,
  },
  {
    name: "Desktop",
    width: 1920,
    height: 1080,
    devicePixelRatio: 1,
    icon: <Monitor className="w-4 h-4" />,
  },
]

export default function DeviceTestingSuite() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<ViewportTest | null>(null)
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    const getDeviceInfo = async (): Promise<DeviceInfo> => {
      const ua = navigator.userAgent
      const platform = navigator.platform

      // Detect device type
      let deviceType: "mobile" | "tablet" | "desktop" = "desktop"
      let deviceModel = "Unknown"

      if (/iPhone|iPod/.test(ua)) {
        deviceType = "mobile"
        deviceModel = ua.match(/iPhone OS [\d_]+/)?.[0] || "iPhone"
      } else if (/iPad/.test(ua)) {
        deviceType = "tablet"
        deviceModel = "iPad"
      } else if (/Android/.test(ua)) {
        if (/Mobile/.test(ua)) {
          deviceType = "mobile"
          deviceModel = ua.match(/Android [\d.]+/)?.[0] || "Android Phone"
        } else {
          deviceType = "tablet"
          deviceModel = "Android Tablet"
        }
      }

      // Detect browser
      let browser = "Unknown"
      let browserVersion = "Unknown"

      if (/Chrome/.test(ua)) {
        browser = "Chrome"
        browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || "Unknown"
      } else if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
        browser = "Safari"
        browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || "Unknown"
      } else if (/Firefox/.test(ua)) {
        browser = "Firefox"
        browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || "Unknown"
      }

      // Get connection info
      const connection =
        (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const connectionType = connection?.effectiveType || "unknown"

      // Get battery info (if available)
      let batteryLevel: number | undefined
      try {
        const battery = await (navigator as any).getBattery?.()
        batteryLevel = battery?.level ? Math.round(battery.level * 100) : undefined
      } catch (e) {
        // Battery API not available
      }

      return {
        userAgent: ua,
        platform,
        deviceType,
        deviceModel,
        browser,
        browserVersion,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.innerHeight > window.innerWidth ? "portrait" : "landscape",
        touchSupport: "ontouchstart" in window,
        connectionType,
        batteryLevel,
        isOnline: navigator.onLine,
      }
    }

    getDeviceInfo().then(setDeviceInfo)

    const handleResize = () => {
      if (deviceInfo) {
        setDeviceInfo((prev) =>
          prev
            ? {
                ...prev,
                orientation: window.innerHeight > window.innerWidth ? "portrait" : "landscape",
              }
            : null,
        )
      }
    }

    const handleOnlineStatus = () => {
      setDeviceInfo((prev) => (prev ? { ...prev, isOnline: navigator.onLine } : null))
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [deviceInfo])

  const runDeviceTests = () => {
    const results: string[] = []

    // Test touch support
    if ("ontouchstart" in window) {
      results.push("✅ Touch events supported")
    } else {
      results.push("❌ Touch events not supported")
    }

    // Test viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (viewportMeta) {
      results.push("✅ Viewport meta tag present")
    } else {
      results.push("❌ Viewport meta tag missing")
    }

    // Test safe area support
    const safeAreaTop = getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-top")
    if (safeAreaTop) {
      results.push("✅ Safe area insets supported")
    } else {
      results.push("⚠️ Safe area insets not detected")
    }

    // Test device pixel ratio
    if (window.devicePixelRatio > 1) {
      results.push(`✅ High DPI display detected (${window.devicePixelRatio}x)`)
    } else {
      results.push("ℹ️ Standard DPI display")
    }

    // Test orientation support
    if ("orientation" in window) {
      results.push("✅ Orientation API supported")
    } else {
      results.push("❌ Orientation API not supported")
    }

    // Test connection API
    const connection = (navigator as any).connection
    if (connection) {
      results.push(`✅ Network info: ${connection.effectiveType || "unknown"}`)
    } else {
      results.push("❌ Network Connection API not supported")
    }

    // Test battery API
    if ("getBattery" in navigator) {
      results.push("✅ Battery API supported")
    } else {
      results.push("❌ Battery API not supported")
    }

    // Test WebP support
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = 1
    const webpSupport = canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0
    if (webpSupport) {
      results.push("✅ WebP images supported")
    } else {
      results.push("❌ WebP images not supported")
    }

    setTestResults(results)
  }

  const simulateViewport = (preset: ViewportTest) => {
    setSelectedPreset(preset)
    // In a real implementation, you would resize the viewport or create an iframe
    console.log(`Simulating ${preset.name}: ${preset.width}x${preset.height}`)
  }

  if (!deviceInfo) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Device Testing Suite</h1>
        <p className="text-gray-400">Comprehensive testing for mobile devices</p>
      </div>

      <Tabs defaultValue="device-info" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="device-info">Device Info</TabsTrigger>
          <TabsTrigger value="viewport-test">Viewport Test</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="device-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {deviceInfo.deviceType === "mobile" && <Smartphone className="w-5 h-5" />}
                {deviceInfo.deviceType === "tablet" && <Tablet className="w-5 h-5" />}
                {deviceInfo.deviceType === "desktop" && <Monitor className="w-5 h-5" />}
                Current Device Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Device Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <Badge variant="outline">{deviceInfo.deviceType}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span>{deviceInfo.deviceModel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform:</span>
                      <span>{deviceInfo.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Browser:</span>
                      <span>
                        {deviceInfo.browser} {deviceInfo.browserVersion}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Display & Hardware</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Screen:</span>
                      <span>
                        {deviceInfo.screenWidth}×{deviceInfo.screenHeight}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pixel Ratio:</span>
                      <span>{deviceInfo.devicePixelRatio}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orientation:</span>
                      <Badge variant="outline">{deviceInfo.orientation}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Touch:</span>
                      <Badge variant={deviceInfo.touchSupport ? "default" : "secondary"}>
                        {deviceInfo.touchSupport ? "Supported" : "Not Supported"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Network & Status</h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    <span>Connection: {deviceInfo.connectionType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4" />
                    <Badge variant={deviceInfo.isOnline ? "default" : "destructive"}>
                      {deviceInfo.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  {deviceInfo.batteryLevel && (
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4" />
                      <span>Battery: {deviceInfo.batteryLevel}%</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="viewport-test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Viewport Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {DEVICE_PRESETS.map((preset) => (
                  <Button
                    key={preset.name}
                    variant={selectedPreset?.name === preset.name ? "default" : "outline"}
                    className="flex items-center gap-2 h-auto p-4"
                    onClick={() => simulateViewport(preset)}
                  >
                    {preset.icon}
                    <div className="text-left">
                      <div className="font-semibold">{preset.name}</div>
                      <div className="text-xs opacity-70">
                        {preset.width}×{preset.height} ({preset.devicePixelRatio}x)
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              {selectedPreset && (
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="font-semibold mb-2">Simulating: {selectedPreset.name}</h3>
                  <div className="text-sm space-y-1">
                    <div>
                      Viewport: {selectedPreset.width}×{selectedPreset.height}
                    </div>
                    <div>Device Pixel Ratio: {selectedPreset.devicePixelRatio}x</div>
                    <div>
                      Effective Resolution: {selectedPreset.width * selectedPreset.devicePixelRatio}×
                      {selectedPreset.height * selectedPreset.devicePixelRatio}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compatibility Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={runDeviceTests} className="mb-4">
                Run Compatibility Tests
              </Button>

              {testResults.length > 0 && (
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono">
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Memory Usage</h3>
                  <div className="text-sm space-y-1">
                    <div>
                      Used JS Heap: {((performance as any).memory?.usedJSHeapSize / 1024 / 1024).toFixed(2) || "N/A"} MB
                    </div>
                    <div>
                      Total JS Heap: {((performance as any).memory?.totalJSHeapSize / 1024 / 1024).toFixed(2) || "N/A"}{" "}
                      MB
                    </div>
                    <div>
                      Heap Limit: {((performance as any).memory?.jsHeapSizeLimit / 1024 / 1024).toFixed(2) || "N/A"} MB
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Navigation Timing</h3>
                  <div className="text-sm space-y-1">
                    <div>
                      DOM Content Loaded:{" "}
                      {performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart}ms
                    </div>
                    <div>Page Load: {performance.timing.loadEventEnd - performance.timing.navigationStart}ms</div>
                    <div>DNS Lookup: {performance.timing.domainLookupEnd - performance.timing.domainLookupStart}ms</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
