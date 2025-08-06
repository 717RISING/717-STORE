import { Suspense } from "react"
import AdminDashboard from "@/components/admin/admin-dashboard"
import AdminLogin from "@/components/admin/admin-login"
import { cookies } from "next/headers"

export default function AdminPage() {
  const cookieStore = cookies()
  const userSession = cookieStore.get("user_session")

  let user = null
  if (userSession) {
    try {
      user = JSON.parse(userSession.value)
    } catch (e) {
      console.error("Failed to parse user session cookie:", e)
    }
  }

  // Simple check for admin role
  const isAdmin = user && user.role === "admin"

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isAdmin ? (
        <Suspense fallback={<div>Cargando Dashboard...</div>}>
          <AdminDashboard />
        </Suspense>
      ) : (
        <AdminLogin onLogin={() => {}} /> // Pass a dummy onLogin for now, as it's handled by server action redirect
      )}
    </div>
  )
}
