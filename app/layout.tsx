import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
// import LoginDemo from "@/components/login-demo" // Removed import

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Other head elements like links, scripts can go here */}
      </head>
      <body className="bg-gray-50" suppressHydrationWarning={true}> {/* Added suppressHydrationWarning */}
        <AuthProvider>
          {children}
          {/* <LoginDemo /> Removed */}
        </AuthProvider>
      </body>
    </html>
  )
}
