"use client"

import { usePathname } from 'next/navigation'
import { MobileMenu } from './mobile-menu'
import { CartSidebar } from './cart-sidebar'
import { PageTransition } from './page-transition'
import { MobileDebugPanel } from './mobile-debug-panel'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { useAuth } from '@/lib/auth-context' // Import useAuth

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobileDetection()
  const { isAuthenticated } = useAuth() // Use auth context

  // Determine if the current path is an admin route
  const isAdminRoute = pathname.startsWith('/admin')

  // Determine if the current path is a login route
  const isLoginRoute = pathname === '/login' || pathname === '/admin/login'

  // Render only children for admin login page
  if (isLoginRoute) {
    return <>{children}</>
  }

  return (
    <>
      <PageTransition>
        {children}
      </PageTransition>
      {isMobile && !isAdminRoute && <MobileMenu />}
      {!isAdminRoute && <CartSidebar />}
      {process.env.NODE_ENV === 'development' && <MobileDebugPanel />}
    </>
  )
}
