"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: "lift" | "glow" | "scale" | "tilt"
  delay?: number
}

export default function AnimatedCard({ children, className, hoverEffect = "lift", delay = 0 }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const effects = {
    lift: "hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#4A1518]/20",
    glow: "hover:shadow-lg hover:shadow-[#4A1518]/30 hover:border-[#4A1518]/50",
    scale: "hover:scale-105 hover:shadow-xl",
    tilt: "hover:rotate-1 hover:scale-105 hover:shadow-xl",
  }

  return (
    <Card
      className={cn(
        "bg-gray-900 border-gray-800 transition-all duration-500 ease-out animate-fade-in",
        effects[hoverEffect],
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="relative overflow-hidden">
        {children}

        {/* Efecto de partículas al hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#4A1518] rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + Math.random()}s`,
                }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
