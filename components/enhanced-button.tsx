'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function EnhancedButton({ isLoading, loadingText, children, className, disabled, ...props }: EnhancedButtonProps) {
  return (
    <Button
      className={cn("relative", className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {isLoading ? loadingText || "Cargando..." : children}
    </Button>
  )
}
