"use client"

import { useState, useEffect } from "react"

interface DeviceDetection {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useMobileDetection(): DeviceDetection {
  const [device, setDevice] = useState<DeviceDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    // Initial check
    checkDevice()

    // Add event listener for window resize
    window.addEventListener("resize", checkDevice)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, [])

  return device
}
