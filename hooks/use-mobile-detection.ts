"use client"

import { useState, useEffect } from "react"

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")
  const [touchSupport, setTouchSupport] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const width = window.innerWidth
      const height = window.innerHeight

      // Mobile detection
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      const isMobileDevice = mobileRegex.test(userAgent) || width <= 768

      // Tablet detection
      const isTabletDevice =
        (width > 768 && width <= 1024) ||
        userAgent.includes("ipad") ||
        (userAgent.includes("android") && !userAgent.includes("mobile"))

      // Orientation
      const currentOrientation = width > height ? "landscape" : "portrait"

      // Touch support
      const hasTouchSupport = "ontouchstart" in window || navigator.maxTouchPoints > 0

      setIsMobile(isMobileDevice)
      setIsTablet(isTabletDevice)
      setOrientation(currentOrientation)
      setTouchSupport(hasTouchSupport)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    window.addEventListener("orientationchange", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    orientation,
    touchSupport,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
  }
}
