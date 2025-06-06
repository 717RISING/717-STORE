"use client"

import type React from "react"

import { usePageTransition } from "@/lib/page-transition-context"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { isLoading, transitionType } = usePageTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-black">{children}</div>
  }

  const getTransitionClasses = () => {
    const baseClasses = "transition-all duration-500 ease-in-out"

    switch (transitionType) {
      case "fade":
        return `${baseClasses} ${isLoading ? "opacity-0" : "opacity-100"}`
      case "slide":
        return `${baseClasses} transform ${isLoading ? "translate-x-full" : "translate-x-0"}`
      case "zoom":
        return `${baseClasses} transform ${isLoading ? "scale-95 opacity-0" : "scale-100 opacity-100"}`
      case "flip":
        return `${baseClasses} transform ${isLoading ? "rotateY-90 opacity-0" : "rotateY-0 opacity-100"}`
      default:
        return `${baseClasses} transform ${isLoading ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"}`
    }
  }

  return <div className={getTransitionClasses()}>{children}</div>
}
