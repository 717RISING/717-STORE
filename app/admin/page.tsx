import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminLogin } from "@/components/admin/admin-login"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-context" // Assuming authOptions are defined here

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
