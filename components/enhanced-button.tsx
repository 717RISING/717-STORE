"use client"

import type React from "react"
import { Loader2 } from "lucide-react"
import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "modern"
  size?: "default" | "sm" | "lg" | "icon"
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ children, loading, className, variant = "default", size = "default", ...props }, ref) => {
    const { theme } = useTheme()
    const baseClasses = "relative overflow-hidden transition-all duration-400 transform"

    const getVariantClasses = (variant: string, theme: string) => {
      const variants = {
        default:
          theme === "dark"
            ? "bg-[#4A1518] hover:bg-[#3A1014] text-white button-modern hover-lift-modern rounded-modern-lg shadow-dark"
            : "bg-[#4A1518] hover:bg-[#3A1014] text-white button-modern hover-lift-modern rounded-modern-lg shadow-light",

        destructive:
          theme === "dark" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-500 hover:bg-red-600 text-white",

        outline:
          theme === "dark"
            ? "border-2 border-[#4A1518] text-[#4A1518] hover:bg-[#4A1518] hover:text-white hover-magnetic-modern rounded-modern"
            : "border-2 border-[#4A1518] text-[#4A1518] hover:bg-[#4A1518] hover:text-white hover-magnetic-modern rounded-modern",

        secondary:
          theme === "dark" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white",

        ghost:
          theme === "dark"
            ? "text-white hover:bg-[#4A1518]/20 hover:text-[#4A1518] hover-glow-modern rounded-modern"
            : "text-gray-700 hover:bg-[#4A1518]/10 hover:text-[#4A1518] hover-glow-modern rounded-modern",

        link: theme === "dark" ? "text-blue-500 hover:text-blue-600" : "text-blue-500 hover:text-blue-600",

        modern:
          theme === "dark"
            ? "bg-gradient-to-r from-[#4A1518] to-[#6B1E22] hover:from-[#3A1014] hover:to-[#5A1B1F] text-white hover-3d-modern rounded-modern-2xl shadow-modern-dark"
            : "bg-gradient-to-r from-[#4A1518] to-[#6B1E22] hover:from-[#3A1014] hover:to-[#5A1B1F] text-white hover-3d-modern rounded-modern-2xl shadow-modern-light",
      }
      return variants[variant as keyof typeof variants] || variants.default
    }

    const sizes = {
      default: "px-6 py-3 text-base",
      sm: "px-4 py-2 text-sm",
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
        variant={variant === "modern" ? "default" : variant} // Use default variant for modern styling
        size={size}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}

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
