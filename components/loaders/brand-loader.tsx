"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface BrandLoaderProps {
  size?: "sm" | "md" | "lg"
  message?: string
}

export default function BrandLoader({ size = "md", message = "Cargando 717 Store..." }: BrandLoaderProps) {
  const [glitchActive, setGlitchActive] = useState(false)
  const [logoScale, setLogoScale] = useState(1)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 2000)

    const scaleInterval = setInterval(() => {
      setLogoScale((prev) => (prev === 1 ? 1.1 : 1))
    }, 1000)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(scaleInterval)
    }
  }, [])

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      {/* Animated Logo */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Main Logo */}
          <div
            className={`w-full h-full relative transition-transform duration-500 ${glitchActive ? "animate-glitch" : ""}`}
            style={{ transform: `scale(${logoScale})` }}
          >
            <Image
              src="/logo.png"
              alt="717 Logo"
              fill
              className="object-contain filter invert animate-pulse-glow"
              priority
            />
          </div>

          {/* Glitch Layers */}
          {glitchActive && (
            <>
              <div className="absolute inset-0 opacity-70 mix-blend-multiply">
                <Image
                  src="/logo.png"
                  alt="717 Logo Glitch"
                  fill
                  className="object-contain filter invert hue-rotate-180"
                />
              </div>
              <div className="absolute inset-0 opacity-50 mix-blend-screen translate-x-1">
                <Image
                  src="/logo.png"
                  alt="717 Logo Glitch"
                  fill
                  className="object-contain filter invert hue-rotate-90"
                />
              </div>
            </>
          )}

          {/* Rotating Ring */}
          <div className="absolute inset-0 border-2 border-[#4A1518] rounded-full animate-spin-slow opacity-30" />

          {/* Pulsing Ring */}
          <div className="absolute inset-0 border border-white rounded-full animate-ping opacity-20" />
        </div>

        {/* Floating Numbers */}
        <div className="absolute inset-0 pointer-events-none">
          {["7", "1", "7"].map((num, i) => (
            <div
              key={i}
              className="absolute text-[#4A1518] font-bold text-lg animate-float opacity-60"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + (i % 2) * 70}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Brand Text */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 animate-fade-in-out">717 STORE</h2>
        <p className="text-gray-400 text-sm mb-4 animate-fade-in-out" style={{ animationDelay: "0.5s" }}>
          {message}
        </p>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#4A1518] via-white to-[#4A1518] animate-loading-bar" />
        </div>

        {/* Tagline */}
        <p className="text-[#4A1518] text-xs font-medium mt-3 animate-pulse">STREETWEAR AUTÉNTICO</p>
      </div>
    </div>
  )
}
