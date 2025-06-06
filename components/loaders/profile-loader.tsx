"use client"

import { useState, useEffect } from "react"
import { User, Heart, ShoppingBag, Settings } from "lucide-react"

interface ProfileLoaderProps {
  size?: "sm" | "md" | "lg"
  userName?: string
}

export default function ProfileLoader({ size = "md", userName = "Usuario" }: ProfileLoaderProps) {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    { icon: User, label: "Perfil", color: "from-blue-500 to-blue-600" },
    { icon: Heart, label: "Favoritos", color: "from-red-500 to-red-600" },
    { icon: ShoppingBag, label: "Pedidos", color: "from-green-500 to-green-600" },
    { icon: Settings, label: "Configuración", color: "from-purple-500 to-purple-600" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [sections.length])

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* Avatar with Animated Border */}
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          {/* Main Avatar */}
          <div className="w-full h-full bg-gradient-to-br from-[#4A1518] to-[#6B1E22] rounded-full flex items-center justify-center animate-pulse-glow">
            <User className="w-6 h-6 text-white" />
          </div>

          {/* Rotating Border */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#4A1518] via-white to-[#4A1518] animate-spin-slow"
            style={{ padding: "2px" }}
          >
            <div className="w-full h-full bg-black rounded-full" />
          </div>
        </div>

        {/* Floating Section Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {sections.map((section, i) => {
            const IconComponent = section.icon
            const angle = i * 90 - 90 // Start from top
            const radius = 35
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius

            return (
              <div
                key={i}
                className={`absolute transition-all duration-500 ${
                  activeSection === i ? "scale-125 opacity-100" : "scale-75 opacity-50"
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${section.color} rounded-modern flex items-center justify-center animate-bounce`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Welcome Text */}
      <div className="text-center">
        <p className="text-white font-medium mb-1">
          Bienvenido, <span className="text-[#4A1518] font-bold">{userName}</span>
        </p>
        <p className="text-gray-400 text-sm animate-fade-in-out">
          Cargando {sections[activeSection].label.toLowerCase()}...
        </p>

        {/* Progress Dots */}
        <div className="flex space-x-2 mt-3 justify-center">
          {sections.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === i ? "bg-[#4A1518] scale-125" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
