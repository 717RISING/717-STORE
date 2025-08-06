'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { ButtonProps } from '@/components/ui/button'

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
}

export default function EnhancedButton({
  loading = false,
  loadingText = 'Cargando...',
  children,
  ...props
}: EnhancedButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </motion.span>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
