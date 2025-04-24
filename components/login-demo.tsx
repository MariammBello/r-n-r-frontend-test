"use client"
import { useAuth, useSampleUser } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

export default function LoginDemo() {
  const { isAuthenticated, login, logout } = useAuth()
  const sampleUser = useSampleUser()
  const pathname = usePathname()

  // Don't show the demo button on the login page
  if (pathname === "/auth/login") { // Updated path
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => (isAuthenticated ? logout() : login(sampleUser))}
        className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors font-medium"
      >
        {isAuthenticated ? "Demo: Sign Out" : "Demo: Sign In as Sarah"}
      </button>
    </div>
  )
}
