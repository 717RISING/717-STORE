"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Zap, Smartphone } from "lucide-react"

interface MobileSearchLoaderProps {
  size?: "sm" | "md" | "lg"
  searchTerm?: string
  voiceSearch?: boolean
}

export default function MobileSearchLoader({
  size = "md",
  searchTerm = "",
  voiceSearch = false,
}: MobileSearchLoaderProps) {
  const [scanProgress, setScanProgress] = useState(0)
  const [foundItems, setFoundItems] = useState(0)
  const [voicePulse, setVoicePulse] = useState(false)

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 8))
    }, 100)

    const itemsInterval = setInterval(() => {
      setFoundItems((prev) => (prev >= 15 ? 0 : prev + 1))
    }, 200)

    return () => {
      clearInterval(scanInterval)
      clearInterval(itemsInterval)
    }
  }, [])

  useEffect(() => {
    if (voiceSearch) {
      const voiceInterval = setInterval(() => {
        setVoicePulse((prev) => !prev)
      }, 500)
      return () => clearInterval(voiceInterval)
    }
  }, [voiceSearch])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 touch-manipulation">
      {/* Mobile Search Interface */}
      <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl max-w-sm w-full">
        {/* Search Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex-1 bg-gray-800 rounded-2xl p-3 flex items-center space-x-3">
            <Search className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-white text-sm truncate">{searchTerm || "Buscando productos..."}</p>
            </div>
            {voiceSearch && (
              <div
                className={`w-3 h-3 bg-red-500 rounded-full transition-all duration-300 ${
                  voicePulse ? "scale-125" : "scale-100"
                }`}
              />
            )}
          </div>
        </div>

        {/* Mobile Search Radar */}
        <div className="flex justify-center mb-6">
          <div className={`${sizeClasses[size]} relative`}>
            {/* Main Search Circle */}
            <div className="w-full h-full bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center shadow-lg">
              <Search className="w-8 h-8 text-white animate-pulse" />
            </div>

            {/* Mobile Scan Ring */}
            <div
              className="absolute inset-0 border-4 border-[#4A1518] rounded-full transition-all duration-100"
              style={{
                transform: `scale(${1 + (scanProgress / 100) * 0.3})`,
                opacity: 1 - (scanProgress / 100) * 0.7,
              }}
            />

            {/* Found Items Counter */}
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{foundItems}</span>
            </div>
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="space-y-4">
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full transition-all duration-100"
              style={{ width: `${scanProgress}%` }}
            />
          </div>

          {/* Search Stats */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2 text-gray-400">
              <Filter className="w-4 h-4" />
              <span>Filtrando</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Zap className="w-4 h-4 text-[#4A1518]" />
              <span>{foundItems} encontrados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Hint */}
      <div className="flex items-center space-x-2 text-gray-500">
        <Smartphone className="w-4 h-4" />
        <p className="text-sm">Toca para buscar por voz</p>
      </div>
    </div>
  )
}
