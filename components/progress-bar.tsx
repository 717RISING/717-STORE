"use client"

import { usePageTransition } from "@/lib/page-transition-context"
import { useEffect, useState } from "react"

export default function ProgressBar() {
  const { isLoading, progress } = usePageTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isLoading) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-[#4A1518] via-[#5D1A1D] to-[#4A1518] transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 10px rgba(77, 21, 24, 0.5)",
          }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}
