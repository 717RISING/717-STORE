"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Loader2 } from 'lucide-react'

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean
  loadingText?: string
  icon?: React.ElementType // For Lucide React icons
  iconPlacement?: "left" | "right"
}

export function EnhancedButton({
  children,
  className,
  isLoading = false,
  loadingText,
  icon: Icon,
  iconPlacement = "left",
  disabled,
  ...props
}: EnhancedButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden",
        isLoading && "cursor-not-allowed opacity-80",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      <motion.span
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn("flex items-center justify-center", isLoading && "invisible")}
      >
        {Icon && iconPlacement === "left" && <Icon className="mr-2 h-4 w-4" />}
        {children}
        {Icon && iconPlacement === "right" && <Icon className="ml-2 h-4 w-4" />}
      </motion.span>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || "Cargando..."}
        </motion.div>
      )}
    </Button>
  )
}
