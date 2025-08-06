'use client'

import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { ReactNode } from 'react'
import { LoadingSpinner } from './loading-spinner' // Assuming LoadingSpinner is a named export
import { cn } from '@/lib/utils'

interface AdaptiveLoaderProps {
  desktopLoader?: ReactNode;
  mobileLoader?: ReactNode;
  isVisible?: boolean; // Added for conditional rendering
  text?: string; // Added for text display
  className?: string; // Added for styling
  size?: 'sm' | 'md' | 'lg'; // Added for spinner size
}

export function AdaptiveLoader({ desktopLoader, mobileLoader, isVisible = true, text, className, size = 'md' }: AdaptiveLoaderProps) { // Changed to named export
  const isMobile = useMobileDetection()

  if (!isVisible) return null;

  if (desktopLoader || mobileLoader) {
    return (
      <div className={cn("flex items-center justify-center w-full h-full", className)}>
        {isMobile ? mobileLoader : desktopLoader}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <LoadingSpinner size={size} />
      {text && <p className="mt-2 text-muted-foreground">{text}</p>}
    </div>
  )
}
