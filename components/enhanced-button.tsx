"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Loader2 } from 'lucide-react'

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
}

export default function EnhancedButton({
  loading = false,
  loadingText = "Cargando...",
  children,
  className,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const [isInternalLoading, setIsInternalLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      setIsInternalLoading(true)
      try {
        await props.onClick(e)
      } finally {
        setIsInternalLoading(false)
      }
    }
  }

  const isLoading = loading || isInternalLoading

  return (
    <Button
      className={cn(
        "relative transition-all duration-200 ease-in-out",
        isLoading && "cursor-not-allowed opacity-80",
        className
      )}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          {loadingText}
        </span>
      )}
      <span className={cn("transition-opacity duration-200", isLoading && "opacity-0")}>
        {children}
      </span>
    </Button>
  )
}
