'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number; // in ms
}

export function AnimatedCard({ children, className, delay = 0, ...props }: AnimatedCardProps) {
  return (
    <Card
      className={cn(
        "opacity-0 translate-y-4 animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  )
}
