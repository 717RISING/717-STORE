"use client"

import type React from "react"

import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "glow" | "pulse"
  size?: "sm" | "md" | "lg" | "icon"
  loading?: boolean
  children: React.ReactNode
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = "default", size = "md", loading = false, children, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden transition-all duration-300 transform"

    const variants = {
      default: "bg-[#4A1518] hover:bg-[#3A1014] text-white hover:scale-105 hover:shadow-lg hover:shadow-[#4A1518]/30",
      outline: "border-2 border-[#4A1518] text-[#4A1518] hover:bg-[#4A1518] hover:text-white hover:scale-105",
      ghost: "text-white hover:bg-[#4A1518]/20 hover:text-[#4A1518]",
      glow: "bg-[#4A1518] hover:bg-[#3A1014] text-white animate-pulse-glow hover:scale-105",
      pulse: "bg-[#4A1518] hover:bg-[#3A1014] text-white animate-bounce-subtle hover:scale-105",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      icon: "p-2",
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
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <span className={loading ? "opacity-0" : ""}>{children}</span>

        {/* Efecto de brillo al hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
      </Button>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"

export default EnhancedButton
