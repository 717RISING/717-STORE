"use client"

import { useState, useEffect } from "react"

interface MobileDetection {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  touchSupport: boolean
  screenWidth: number
  screenHeight: number
  orientation: "portrait" | "landscape"
  deviceType: "mobile" | "tablet" | "desktop"
}

export function useMobileDetection(): MobileDetection {
  const [detection, setDetection] = useState<MobileDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    touchSupport: false,
    screenWidth: 1920,
    screenHeight: 1080,
    orientation: "landscape",
    deviceType: "desktop",
  })

  useEffect(() => {
    const updateDetection = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024
      const touchSupport = "ontouchstart" in window || navigator.maxTouchPoints > 0
      const orientation = width > height ? "landscape" : "portrait"

      let deviceType: "mobile" | "tablet" | "desktop" = "desktop"
      if (isMobile) deviceType = "mobile"
      else if (isTablet) deviceType = "tablet"

      setDetection({
        isMobile,
        isTablet,
        isDesktop,
        touchSupport,
        screenWidth: width,
        screenHeight: height,
        orientation,
        deviceType,
      })
    }

    // Initial detection
    updateDetection()

    // Listen for resize events
    window.addEventListener("resize", updateDetection)
    window.addEventListener("orientationchange", updateDetection)

    return () => {
      window.removeEventListener("resize", updateDetection)
      window.removeEventListener("orientationchange", updateDetection)
    }
  }, [])

  return detection
}
