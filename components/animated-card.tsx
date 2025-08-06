"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  delay?: number
  duration?: number
  children: React.ReactNode
}

export function AnimatedCard({ delay = 0, duration = 0.5, children, className, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={cn("h-full", className)}
    >
      <Card className={cn("h-full bg-gray-800 border-gray-700 text-white", className)} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
