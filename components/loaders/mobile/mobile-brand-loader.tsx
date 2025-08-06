import { cn } from "@/lib/utils"
import { Loader2 } from 'lucide-react'

interface MobileBrandLoaderProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function MobileBrandLoader({ className, size = "md" }: MobileBrandLoaderProps) {
  const loaderSizeClass = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-18 w-18",
  }[size]

  const textSizeClass = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl",
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
