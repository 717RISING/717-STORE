"use client"

import { useState, useEffect } from "react"
import { ImageIcon, Eye, Sparkles } from "lucide-react"

interface ImageLoaderProps {
  size?: "sm" | "md" | "lg"
  count?: number
}

export default function ImageLoader({ size = "md", count = 1 }: ImageLoaderProps) {
  const [loadedPixels, setLoadedPixels] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const pixelInterval = setInterval(() => {
      setLoadedPixels((prev) => (prev >= 100 ? 0 : prev + 3))
    }, 50)

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % count)
    }, 1500)

    return () => {
      clearInterval(pixelInterval)
      clearInterval(imageInterval)
    }
  }, [count])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* Image Frame */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Main Frame */}
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-modern border-2 border-[#4A1518] flex items-center justify-center overflow-hidden">
            <ImageIcon className="w-6 h-6 text-[#4A1518] animate-pulse" />

            {/* Loading Pixels Effect */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white animate-twinkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scanning Line */}
          <div
            className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#4A1518] to-transparent"
            style={{
              top: `${loadedPixels}%`,
              transition: "top 0.1s ease-out",
            }}
          />

          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#4A1518] animate-pulse" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#4A1518] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#4A1518] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#4A1518] animate-pulse" />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Eye
            className="absolute top-0 right-0 w-4 h-4 text-[#4A1518] animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <Sparkles
            className="absolute bottom-0 left-0 w-4 h-4 text-[#4A1518] animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      {/* Loading Status */}
      <div className="text-center">
        <p className="text-white font-medium mb-2">
          {count > 1 ? `Cargando imagen ${currentImage + 1} de ${count}` : "Cargando imagen..."}
        </p>

        <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${loadedPixels}%` }}
          />
        </div>

        <p className="text-gray-400 text-xs mt-2">{loadedPixels}% completado</p>
      </div>
    </div>
  )
}
