import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import LoginDemo from "@/components/login-demo"

export const metadata: Metadata = {
  title: "Roots n Routes - Travel & Explore",
  description: "Discover your roots and plan your routes with our travel platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className="bg-gray-50" suppressHydrationWarning={true}> {/* Added suppressHydrationWarning */}
        <AuthProvider>
          {children}
          <LoginDemo />
        </AuthProvider>
      </body>
    </html>
  )
}
