"use client"

import type React from "react"

import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "glow" | "pulse" | "modern" | "glassmorphism" | "neon"
  size?: "sm" | "md" | "lg" | "icon"
  loading?: boolean
  children: React.ReactNode
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = "default", size = "md", loading = false, children, ...props }, ref) => {
    const { theme } = useTheme()
    const baseClasses = "relative overflow-hidden transition-all duration-400 transform"

    const getVariantClasses = (variant: string, theme: string) => {
      const variants = {
        default:
          theme === "dark"
            ? "bg-[#4A1518] hover:bg-[#3A1014] text-white button-modern hover-lift-modern rounded-modern-lg shadow-dark"
            : "bg-[#4A1518] hover:bg-[#3A1014] text-white button-modern hover-lift-modern rounded-modern-lg shadow-light",

        outline:
          theme === "dark"
            ? "border-2 border-[#4A1518] text-[#4A1518] hover:bg-[#4A1518] hover:text-white hover-magnetic-modern rounded-modern"
            : "border-2 border-[#4A1518] text-[#4A1518] hover:bg-[#4A1518] hover:text-white hover-magnetic-modern rounded-modern",

        ghost:
          theme === "dark"
            ? "text-white hover:bg-[#4A1518]/20 hover:text-[#4A1518] hover-glow-modern rounded-modern"
            : "text-gray-700 hover:bg-[#4A1518]/10 hover:text-[#4A1518] hover-glow-modern rounded-modern",

        glow:
          theme === "dark"
            ? "bg-[#4A1518] hover:bg-[#3A1014] text-white hover-neon-modern rounded-modern-lg animate-cyber-glow shadow-glow-dark"
            : "bg-[#4A1518] hover:bg-[#3A1014] text-white hover-neon-modern rounded-modern-lg animate-cyber-glow shadow-glow-light",

        pulse:
          theme === "dark"
            ? "bg-[#4A1518] hover:bg-[#3A1014] text-white animate-pulse-glow hover-lift-modern rounded-modern-xl shadow-pulse-dark"
            : "bg-[#4A1518] hover:bg-[#3A1014] text-white animate-pulse-glow hover-lift-modern rounded-modern-xl shadow-pulse-light",

        modern:
          theme === "dark"
            ? "bg-gradient-to-r from-[#4A1518] to-[#6B1E22] hover:from-[#3A1014] hover:to-[#5A1B1F] text-white hover-3d-modern rounded-modern-2xl shadow-modern-dark"
            : "bg-gradient-to-r from-[#4A1518] to-[#6B1E22] hover:from-[#3A1014] hover:to-[#5A1B1F] text-white hover-3d-modern rounded-modern-2xl shadow-modern-light",

        glassmorphism:
          theme === "dark"
            ? "hover-glassmorphism-dark text-white backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 rounded-modern-lg"
            : "hover-glassmorphism-light text-gray-700 backdrop-blur-md bg-gray-900/5 border border-gray-900/10 hover:bg-gray-900/10 rounded-modern-lg",

        neon:
          theme === "dark"
            ? "bg-transparent border-2 border-[#4A1518] text-[#4A1518] hover-neon-modern rounded-modern-lg animate-neon-glow-dark"
            : "bg-transparent border-2 border-[#4A1518] text-[#4A1518] hover-neon-modern rounded-modern-lg animate-neon-glow-light",
      }
      return variants[variant as keyof typeof variants] || variants.default
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
          getVariantClasses(variant, theme),
          sizes[size],
          loading && "opacity-70 cursor-not-allowed",
          className,
        )}
        disabled={loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "w-5 h-5 border-2 border-t-transparent rounded-full animate-spin",
                theme === "dark" ? "border-white" : "border-gray-700",
              )}
            ></div>
          </div>
        )}
        <span className={loading ? "opacity-0" : ""}>{children}</span>

        {/* Efecto de brillo adaptativo */}
        <div
          className={cn(
            "absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 rounded-inherit",
            theme === "dark"
              ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
              : "bg-gradient-to-r from-transparent via-gray-900/20 to-transparent",
          )}
        ></div>

        {/* Efecto de ripple adaptativo */}
        <div className="absolute inset-0 rounded-inherit">
          <div
            className={cn(
              "absolute inset-0 rounded-inherit animate-ripple opacity-0 hover:opacity-100",
              theme === "dark" ? "bg-white/10" : "bg-gray-900/10",
            )}
          ></div>
        </div>
      </Button>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"

export default EnhancedButton
