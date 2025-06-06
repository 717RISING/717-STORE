"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Smartphone, Wifi } from "lucide-react"

interface MobileBrandLoaderProps {
  size?: "sm" | "md" | "lg"
  message?: string
  splashScreen?: boolean
}

export default function MobileBrandLoader({
  size = "md",
  message = "Cargando 717 Store...",
  splashScreen = true,
}: MobileBrandLoaderProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [logoScale, setLogoScale] = useState(0.8)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Initial logo animation
    setTimeout(() => setLogoScale(1), 300)
    setTimeout(() => setShowContent(true), 600)

    // Loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => (prev >= 100 ? 100 : prev + 2))
    }, 50)

    return () => clearInterval(progressInterval)
  }, [])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  if (splashScreen) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        {/* Mobile Status Bar Simulation */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-black flex items-center justify-between px-6 text-white text-sm">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4" />
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-white rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div
            className={`${sizeClasses[size]} relative transition-transform duration-500 ease-out`}
            style={{ transform: `scale(${logoScale})` }}
          >
            <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert" priority />
          </div>

          {/* Brand Text */}
          {showContent && (
            <div className="text-center animate-fade-in">
              <h1 className="text-white text-3xl font-bold mb-2">717 STORE</h1>
              <p className="text-gray-400 text-sm mb-6">STREETWEAR AUTÉNTICO</p>

              {/* Mobile Loading Bar */}
              <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full transition-all duration-100"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              <p className="text-gray-500 text-sm">{message}</p>
            </div>
          )}
        </div>

        {/* Mobile Home Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 touch-manipulation">
      {/* Compact Mobile Logo */}
      <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
        <div className={`${sizeClasses[size]} relative mb-4`}>
          <Image src="/logo.png" alt="717 Logo" fill className="object-contain filter invert animate-pulse" priority />

          {/* Mobile pulse ring */}
          <div className="absolute inset-0 border-2 border-[#4A1518] rounded-2xl animate-ping opacity-30" />
        </div>

        <div className="text-center">
          <h3 className="text-white font-bold text-lg mb-2">717 STORE</h3>
          <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Info */}
      <div className="flex items-center space-x-2 text-gray-500">
        <Smartphone className="w-4 h-4" />
        <p className="text-sm">Optimizado para móvil</p>
      </div>
    </div>
  )
}
