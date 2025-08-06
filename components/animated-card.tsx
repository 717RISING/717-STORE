'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  delay?: number;
  duration?: number;
  from?: "left" | "right" | "top" | "bottom" | "opacity";
}

export function AnimatedCard({
  children,
  delay = 0,
  duration = 0.5,
  from = "bottom",
  className,
  ...props
}: AnimatedCardProps) {
  const variants = {
    hidden: {
      opacity: 0,
      x: from === "left" ? -50 : from === "right" ? 50 : 0,
      y: from === "top" ? -50 : from === "bottom" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={cn("h-full", className)}
    >
      <Card className="h-full" {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
