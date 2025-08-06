import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { redirect } from 'next/navigation'
import { validateUserSession } from '@/app/actions'

export default async function AdminPage() {
  const session = await validateUserSession()

  if (!session.success || session.data?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/login?redirect=/admin')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <AdminDashboard />
    </div>
  )
}
