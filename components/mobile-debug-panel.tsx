'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function MobileDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [userAgent, setUserAgent] = useState('')
  const [orientation, setOrientation] = useState('')

  useEffect(() => {
    const updateInfo = () => {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)
      setUserAgent(navigator.userAgent)
      setOrientation(window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape')
    }

    updateInfo()
    window.addEventListener('resize', updateInfo)
    return () => window.removeEventListener('resize', updateInfo)
  }, [])

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#4A1518] hover:bg-[#6B1E22] text-white rounded-full p-3 shadow-lg"
        size="icon"
      >
        Debug
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 bg-gray-800 text-white shadow-lg border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Panel de Depuración Móvil</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <p><strong>Ancho de Pantalla:</strong> {screenWidth}px</p>
        <p><strong>Alto de Pantalla:</strong> {screenHeight}px</p>
        <p><strong>Orientación:</strong> {orientation}</p>
        <p className="break-words"><strong>User Agent:</strong> {userAgent}</p>
      </CardContent>
    </Card>
  )
}
