"use client"

import type React from "react"

import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "glow" | "pulse" | "modern" | "glassmorphism" | "neon"
  size?: "sm" | "md" | "lg" | "icon"
  loading?: boolean
  children: React.ReactNode
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = "default", size = "md", loading = false, children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden transition-all duration-400 transform"

    const variants = {
      default: "bg-[#4A1518] hover:bg-[#3A1014] text-white button-modern hover-lift-modern rounded-modern-lg",
      outline:
        "border-2 border-[#4A1518] text-[#4A1518] hover:bg-[#4A1518] hover:text-white hover-magnetic-modern rounded-modern",
      ghost: "text-white hover:bg-[#4A1518]/20 hover:text-[#4A1518] hover-glow-modern rounded-modern",
      glow: "bg-[#4A1518] hover:bg-[#3A1014] text-white hover-neon-modern rounded-modern-lg animate-cyber-glow",
      pulse: "bg-[#4A1518] hover:bg-[#3A1014] text-white animate-pulse-glow hover-lift-modern rounded-modern-xl",
      modern:
        "bg-gradient-to-r from-[#4A1518] to-[#6B1E22] hover:from-[#3A1014] hover:to-[#5A1B1F] text-white hover-3d-modern rounded-modern-2xl shadow-lg",
      glassmorphism: "hover-glassmorphism text-white backdrop-blur-md",
      neon: "bg-transparent border-2 border-[#4A1518] text-[#4A1518] hover-neon-modern rounded-modern-lg animate-neon-glow",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      icon: "p-3",
    }

    return (
      <Button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          loading && "opacity-70 cursor-not-allowed",
          className,
        )}
        disabled={loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loading-modern w-5 h-5"></div>
          </div>
        )}
        <span className={loading ? "opacity-0" : ""}>{children}</span>

        {/* Efecto de brillo al hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>

        {/* Efecto de ripple */}
        <div className="absolute inset-0 rounded-inherit">
          <div className="absolute inset-0 rounded-inherit animate-ripple opacity-0 hover:opacity-100 bg-white/10"></div>
        </div>
      </Button>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"

export default EnhancedButton
