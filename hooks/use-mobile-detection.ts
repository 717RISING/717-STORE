"use client"

import { useState, useEffect } from "react"

interface MobileDetectionResult {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useMobileDetection(): MobileDetectionResult {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const checkDeviceType = () => {
    if (typeof window === "undefined") {
      // Default to desktop on server-side rendering
      setIsMobile(false)
      setIsTablet(false)
      setIsDesktop(true)
      return
    }

    const width = window.innerWidth
    const mobileBreakpoint = 768 // Tailwind's 'md' breakpoint
    const tabletBreakpoint = 1024 // Tailwind's 'lg' breakpoint

    setIsMobile(width < mobileBreakpoint)
    setIsTablet(width >= mobileBreakpoint && width < tabletBreakpoint)
    setIsDesktop(width >= tabletBreakpoint)
  }

  useEffect(() => {
    setHasMounted(true)
    checkDeviceType() // Initial check

    window.addEventListener("resize", checkDeviceType)
    return () => {
      window.removeEventListener("resize", checkDeviceType)
    }
  }, [])

  // Return default values until mounted on client to prevent hydration mismatch
  if (!hasMounted) {
    return { isMobile: false, isTablet: false, isDesktop: true }
  }

  return { isMobile, isTablet, isDesktop }
}
