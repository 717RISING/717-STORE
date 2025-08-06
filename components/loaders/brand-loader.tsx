import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface BrandLoaderProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function BrandLoader({ className, size = "md" }: BrandLoaderProps) {
  const loaderSizeClass = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }[size]

  const textSizeClass = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }[size]

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin text-[#4A1518] dark:text-[#FFD700]", loaderSizeClass)} />
      <p className={cn("mt-4 font-bold text-[#4A1518] dark:text-[#FFD700] brand-font", textSizeClass)}>
        717 STORE
      </p>
    </div>
  )
}
