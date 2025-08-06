'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Bug } from 'lucide-react'
import { useMobileDetection } from '@/hooks/use-mobile-detection'

export function MobileDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [orientation, setOrientation] = useState('')
  const isMobileDevice = useMobileDetection()

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      setOrientation(window.innerWidth > window.innerHeight ? 'Landscape' : 'Portrait')
    }

    if (typeof window !== 'undefined') {
      handleResize() // Set initial size
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!isMobileDevice) {
    return null // Only show on mobile devices
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        size="icon"
        className="rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle debug panel"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Bug className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <Card className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <CardHeader className="p-3 border-b dark:border-gray-700">
            <CardTitle className="text-md">Debug Info</CardTitle>
          </CardHeader>
          <CardContent className="p-3 text-sm space-y-1">
            <p>
              <strong>Device:</strong> {isMobileDevice ? 'Mobile' : 'Desktop'}
            </p>
            <p>
              <strong>Width:</strong> {windowSize.width}px
            </p>
            <p>
              <strong>Height:</strong> {windowSize.height}px
            </p>
            <p>
              <strong>Orientation:</strong> {orientation}
            </p>
            <p>
              <strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'N/A'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
