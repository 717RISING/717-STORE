"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { usePageTransition } from '@/lib/page-transition-context' // Assuming this context exists

interface PageTransitionProps {
  children: React.ReactNode
}

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { isTransitioning } = usePageTransition()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
        className="w-full h-full" // Ensure it takes full space
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
