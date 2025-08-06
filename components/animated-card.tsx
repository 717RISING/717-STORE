'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AnimatedCardProps {
  title: string
  description?: string
  children: React.ReactNode
  delay?: number
}

export default function AnimatedCard({ title, description, children, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{title}</CardTitle>
          {description && (
            <CardDescription className="text-gray-600 dark:text-gray-400">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-grow text-gray-700 dark:text-gray-300">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}
