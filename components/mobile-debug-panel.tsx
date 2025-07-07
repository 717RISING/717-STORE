"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Bug, Smartphone, Wifi, Battery, Zap } from "lucide-react"

interface DebugInfo {
  viewport: { width: number; height: number }
  devicePixelRatio: number
  orientation: string
  touchPoints: number
  connection: string
  battery?: number
  memory?: {
    used: number
    total: number
    limit: number
  }
  performance: {
    domContentLoaded: number
    pageLoad: number
  }
}

export default function MobileDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const updateDebugInfo = async () => {
      let battery: number | undefined
      try {
        const batteryManager = await (navigator as any).getBattery?.()
        battery = batteryManager ? Math.round(batteryManager.level * 100) : undefined
      } catch (e) {
        // Battery API not available
      }

      const connection =
        (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

      const info: DebugInfo = {
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.innerHeight > window.innerWidth ? "portrait" : "landscape",
        touchPoints: navigator.maxTouchPoints || 0,
        connection: connection?.effectiveType || "unknown",
        battery,
        memory: (performance as any).memory
          ? {
              used: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024),
              total: Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024),
              limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024),
            }
          : undefined,
        performance: {
          domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
          pageLoad: performance.timing.loadEventEnd - performance.timing.navigationStart,
        },
      }

      setDebugInfo(info)
    }

    updateDebugInfo()

    const interval = setInterval(updateDebugInfo, 2000)

    // Capture console logs
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn

    console.log = (...args) => {
      setLogs((prev) => [...prev.slice(-9), `LOG: ${args.join(" ")}`])
      originalLog(...args)
    }

    console.error = (...args) => {
      setLogs((prev) => [...prev.slice(-9), `ERROR: ${args.join(" ")}`])
      originalError(...args)
    }

    console.warn = (...args) => {
      setLogs((prev) => [...prev.slice(-9), `WARN: ${args.join(" ")}`])
      originalWarn(...args)
    }

    return () => {
      clearInterval(interval)
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  if (!debugInfo) return null

  return (
    <>
      {/* Debug Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-red-600 hover:bg-red-700"
        size="sm"
      >
        <Bug className="w-5 h-5" />
      </Button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-end md:items-center md:justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto bg-gray-900 text-white border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Mobile Debug Panel
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Device Info */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Device Information</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>Viewport:</span>
                    <span>
                      {debugInfo.viewport.width}×{debugInfo.viewport.height}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>DPR:</span>
                    <span>{debugInfo.devicePixelRatio}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orientation:</span>
                    <Badge variant="outline" className="text-xs h-5">
                      {debugInfo.orientation}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Touch Points:</span>
                    <span>{debugInfo.touchPoints}</span>
                  </div>
                </div>
              </div>

              {/* Network & Battery */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Status</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs">
                    <Wifi className="w-3 h-3" />
                    <span>{debugInfo.connection}</span>
                  </div>
                  {debugInfo.battery && (
                    <div className="flex items-center gap-1 text-xs">
                      <Battery className="w-3 h-3" />
                      <span>{debugInfo.battery}%</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xs">
                    <Zap className="w-3 h-3" />
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Performance</h3>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>DOM Ready:</span>
                    <span>{debugInfo.performance.domContentLoaded}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Page Load:</span>
                    <span>{debugInfo.performance.pageLoad}ms</span>
                  </div>
                  {debugInfo.memory && (
                    <>
                      <div className="flex justify-between">
                        <span>Memory Used:</span>
                        <span>{debugInfo.memory.used}MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Memory Total:</span>
                        <span>{debugInfo.memory.total}MB</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Console Logs */}
              <div>
                <h3 className="font-semibold mb-2 text-sm">Recent Logs</h3>
                <div className="bg-black rounded p-2 max-h-32 overflow-y-auto">
                  {logs.length === 0 ? (
                    <div className="text-xs text-gray-500">No logs captured</div>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="text-xs font-mono mb-1 break-all">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="text-xs">
                  Reload Page
                </Button>
                <Button size="sm" variant="outline" onClick={() => setLogs([])} className="text-xs">
                  Clear Logs
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const info = JSON.stringify(debugInfo, null, 2)
                    navigator.clipboard?.writeText(info)
                  }}
                  className="text-xs"
                >
                  Copy Info
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
