"use client"

import { useState, useEffect } from "react"
import { User, Heart, ShoppingBag, Settings, Smartphone } from "lucide-react"

interface MobileProfileLoaderProps {
  size?: "sm" | "md" | "lg"
  userName?: string
  swipeGesture?: boolean
}

export default function MobileProfileLoader({
  size = "md",
  userName = "Usuario",
  swipeGesture = true,
}: MobileProfileLoaderProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  const sections = [
    { icon: User, label: "Perfil", color: "from-blue-500 to-blue-600" },
    { icon: Heart, label: "Favoritos", color: "from-red-500 to-red-600" },
    { icon: ShoppingBag, label: "Pedidos", color: "from-green-500 to-green-600" },
    { icon: Settings, label: "Config", color: "from-purple-500 to-purple-600" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => {
        const next = (prev + 1) % sections.length
        setSwipeDirection(next > prev ? "left" : "right")
        setTimeout(() => setSwipeDirection(null), 300)
        return next
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [sections.length])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 touch-manipulation">
      {/* Mobile Profile Card */}
      <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl max-w-sm w-full">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className={`${sizeClasses[size]} relative mb-4`}>
            {/* Main Avatar */}
            <div className="w-full h-full bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>

            {/* Mobile-optimized border */}
            <div className="absolute inset-0 rounded-full border-3 border-white opacity-20 animate-pulse" />

            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>

          {/* User Info */}
          <h3 className="text-white font-bold text-xl mb-1">¡Hola, {userName}!</h3>
          <p className="text-gray-400 text-sm">Cargando tu perfil...</p>
        </div>

        {/* Mobile Section Cards */}
        <div className="grid grid-cols-2 gap-3">
          {sections.map((section, i) => {
            const IconComponent = section.icon
            const isActive = activeSection === i

            return (
              <div
                key={i}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  isActive ? `bg-gradient-to-br ${section.color} scale-105 shadow-lg` : "bg-gray-800 scale-100"
                } ${swipeDirection && isActive ? `animate-slide-${swipeDirection}` : ""}`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <IconComponent className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span className={`text-xs font-medium ${isActive ? "text-white" : "text-gray-400"}`}>
                    {section.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {sections.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === i ? "bg-[#4A1518] scale-125" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Gesture Hint */}
      {swipeGesture && (
        <div className="flex items-center space-x-2 text-gray-500">
          <Smartphone className="w-4 h-4" />
          <p className="text-sm">Desliza para navegar</p>
        </div>
      )}
    </div>
  )
}
