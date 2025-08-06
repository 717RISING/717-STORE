'use client'

import { useState, useEffect } from 'react'

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent
      const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
      const tabletRegex = /android|ipad|playbook|silk/i

      const isMobileDevice = mobileRegex.test(userAgent) || (window.innerWidth <= 768 && window.innerHeight <= 1024)
      const isTabletDevice = tabletRegex.test(userAgent) || (window.innerWidth > 768 && window.innerWidth <= 1024)

      setIsMobile(isMobileDevice)
      setIsTablet(isTabletDevice && !isMobileDevice) // Ensure tablet isn't also classified as mobile
      setIsDesktop(!isMobileDevice && !isTabletDevice)
    }

    // Initial check
    checkDevice()

    // Add event listener for window resize
    window.addEventListener('resize', checkDevice)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  return { isMobile, isTablet, isDesktop }
}
