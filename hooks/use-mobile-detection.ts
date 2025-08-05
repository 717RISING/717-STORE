"use client"

import { useState, useEffect } from "react"

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [touchSupport, setTouchSupport] = useState(false)
  const [screenWidth, setScreenWidth] = useState(1920)
  const [screenHeight, setScreenHeight] = useState(1080)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape")
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

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

      setIsMobile(isMobile)
      setIsTablet(isTablet)
      setIsDesktop(isDesktop)
      setTouchSupport(touchSupport)
      setScreenWidth(width)
      setScreenHeight(height)
      setOrientation(orientation)
      setDeviceType(deviceType)
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

  return { isMobile, isTablet, isDesktop, touchSupport, screenWidth, screenHeight, orientation, deviceType }
}
