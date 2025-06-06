"use client"

import { usePageTransition } from "@/lib/page-transition-context"
import { useEffect, useState } from "react"

type LoaderType = "spin" | "pulse" | "bounce" | "dots" | "wave"

interface PageLoaderProps {
  type?: LoaderType
}

export default function PageLoader({ type = "spin" }: PageLoaderProps) {
  const { isLoading } = usePageTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isLoading) {
    return null
  }

  const renderLoader = () => {
    switch (type) {
      case "spin":
        return <div className="w-12 h-12 border-4 border-[#4A1518] border-t-transparent rounded-full animate-spin" />
      case "pulse":
        return <div className="w-12 h-12 bg-[#4A1518] rounded-full animate-pulse" />
      case "bounce":
        return (
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#4A1518] rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-[#4A1518] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-3 h-3 bg-[#4A1518] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        )
      case "dots":
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-[#4A1518] rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-[#4A1518] rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
            <div className="w-2 h-2 bg-[#4A1518] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
          </div>
        )
      case "wave":
        return (
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-8 bg-[#4A1518] animate-wave" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        )
      default:
        return <div className="w-12 h-12 border-4 border-[#4A1518] border-t-transparent rounded-full animate-spin" />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {renderLoader()}
        <div className="text-white text-sm animate-pulse">
          Cargando<span className="animate-dots">...</span>
        </div>
      </div>
    </div>
  )
}
