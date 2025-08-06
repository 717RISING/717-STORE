"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  delay?: number
  duration?: number
  animation?: 'fade-in' | 'slide-up' | 'scale-in'
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  duration = 0.5,
  animation = 'fade-in',
  ...props
}: AnimatedCardProps) {
  const variants = {
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    'scale-in': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[animation]}
      transition={{ duration, delay }}
      className={cn("h-full", className)}
    >
      <Card className={cn("h-full", className)} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
