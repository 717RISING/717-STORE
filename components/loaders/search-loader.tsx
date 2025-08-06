"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Zap } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface SearchLoaderProps {
  size?: "sm" | "md" | "lg"
  searchTerm?: string
  message?: string
}

export default function SearchLoader({ size = "md", searchTerm = "", message = "Buscando resultados..." }: SearchLoaderProps) {
  const [scanLine, setScanLine] = useState(0)
  const [foundItems, setFoundItems] = useState(0)

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 5))
    }, 100)

    const itemsInterval = setInterval(() => {
      setFoundItems((prev) => (prev >= 12 ? 0 : prev + 1))
    }, 300)

    return () => {
      clearInterval(scanInterval)
      clearInterval(itemsInterval)
    }
  }, [])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center bg-gray-950 p-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center shadow-lg">
          <Search className="w-12 h-12 text-white animate-pulse" />
        </div>
        <div className="absolute inset-0 border-4 border-[#4A1518] rounded-full animate-ping opacity-40" />
      </div>

      <div className="text-center max-w-md">
        <p className="text-2xl font-semibold mb-2 text-white">{message}</p>
        <p className="text-gray-400 text-base">Estamos rastreando los mejores resultados para ti.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10 w-full max-w-xl">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="w-full bg-gray-800 border-gray-700 shadow-lg">
            <CardContent className="p-3 space-y-2">
              <Skeleton className="h-24 w-full rounded-md bg-gray-700" />
              <Skeleton className="h-4 w-3/4 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Radar */}
      <div className="relative mt-8">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Main Search Circle */}
          <div className="w-full h-full bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center animate-pulse-glow">
            <Search className="w-6 h-6 text-white animate-bounce" />
          </div>

          {/* Scanning Rings */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-2 border-[#4A1518] rounded-full animate-ping opacity-30"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: "2s",
              }}
            />
          ))}

          {/* Scan Line */}
          <div
            className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"
            style={{ top: `${scanLine}%` }}
          />
        </div>

        {/* Found Items Indicators */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(foundItems)].map((_, i) => {
            const angle = i * 30 + ((Date.now() / 100) % 360)
            const radius = 40 + (i % 3) * 10
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius

            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#4A1518] rounded-full animate-pulse"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Search Status */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Zap className="w-4 h-4 text-[#4A1518] animate-pulse" />
          <p className="text-white font-medium">
            {searchTerm ? `Buscando "${searchTerm}"...` : "Explorando catálogo..."}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Filtrando</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <span>{foundItems} encontrados</span>
        </div>

        {/* Search Progress */}
        <div className="w-40 h-1 bg-gray-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4A1518] to-[#6B1E22] rounded-full animate-pulse"
            style={{ width: `${(scanLine / 100) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
