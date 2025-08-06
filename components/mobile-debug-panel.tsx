"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Settings, X, Smartphone, Tablet, Monitor } from 'lucide-react'
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export default function MobileDebugPanel() {
  const { isMobile, isTablet, isDesktop } = useMobileDetection()
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [userAgent, setUserAgent] = useState("")
  const [isClient, setIsClient] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsClient(true)
    const updateInfo = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
      setUserAgent(navigator.userAgent)
    }

    updateInfo()
    window.addEventListener("resize", updateInfo)
    return () => window.removeEventListener("resize", updateInfo)
  }, [])

  if (!isClient) {
    return null // Render nothing on server or until client-side hydration
  }

  const getDeviceIcon = () => {
    if (isMobile) return <Smartphone className="h-5 w-5 text-blue-500" />
    if (isTablet) return <Tablet className="h-5 w-5 text-green-500" />
    if (isDesktop) return <Monitor className="h-5 w-5 text-purple-500" />
    return null
  }

  const getDeviceTypeString = () => {
    if (isMobile) return "Móvil"
    if (isTablet) return "Tablet"
    if (isDesktop) return "Escritorio"
    return "Desconocido"
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-20 rounded-full shadow-lg z-50 w-12 h-12 p-0 bg-gray-800 text-white hover:bg-gray-700"
          aria-label="Open debug panel"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-4">
        <SheetHeader className="flex flex-row items-center justify-between pb-4">
          <SheetTitle className="text-xl font-bold">Panel de Depuración Móvil</SheetTitle>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { /* Close sheet logic */ }}>
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {getDeviceIcon()}
              Información del Dispositivo
            </h3>
            <p className="text-sm">
              <strong>Tipo:</strong> {getDeviceTypeString()}
            </p>
            <p className="text-sm">
              <strong>Ancho:</strong> {screenWidth}px
            </p>
            <p className="text-sm">
              <strong>Alto:</strong> {screenHeight}px
            </p>
            <p className="text-sm break-words">
              <strong>User Agent:</strong> {userAgent}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Controles de Visualización</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode-toggle">Modo Oscuro</Label>
              <Switch
                id="dark-mode-toggle"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="reload-page">Recargar Página</Label>
              <Button size="sm" onClick={() => window.location.reload()}>
                Recargar
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="clear-local-storage">Limpiar Local Storage</Label>
              <Button size="sm" variant="destructive" onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}>
                Limpiar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Pruebas Rápidas</h3>
            <Button className="w-full" onClick={() => alert("Alerta de prueba!")}>
              Mostrar Alerta
            </Button>
            <Button className="w-full" variant="outline" onClick={() => console.log("Consola de prueba!")}>
              Log en Consola
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
