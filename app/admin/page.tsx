import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminLogin } from "@/components/admin/admin-login"
import { validateAdminSession } from "@/lib/users" // Assuming this function exists

export default async function AdminPage() {
  // In a real application, this would check a secure session or token
  const isAdminLoggedIn = await validateAdminSession() // Simulate session validation

  if (!isAdminLoggedIn) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
