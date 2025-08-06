'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface EnhancedButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  loading?: boolean;
  icon?: React.ReactNode;
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ children, loading, icon, className, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("relative", className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={cn({ "opacity-0": loading })}>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </span>
      </Button>
    )
  }
)

EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton }
