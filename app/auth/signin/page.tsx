"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { useAuth, useSampleUser } from "@/contexts/auth-context"

export default function SignInPage() {
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()
  const sampleUser = useSampleUser()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // If already authenticated, redirect to home page
  if (isAuthenticated) {
    router.push("/")
    return null
  }

  const handleSignIn = () => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      login(sampleUser)
      router.push("/")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-screen font-sans flex-col sm:flex-row"> {/* Updated outer div class */}
      {/* Left side - From confirmation page */}
      <div className="w-full sm:w-1/2 relative hidden sm:block"> {/* Updated div class */}
        <Image
          src="/Images/flightimage.png" // Using /Images/ path
          alt="Aerial view with world map"
          fill
          className="object-cover"
          // Removed priority prop
        />

        <Image
          src="/Images/plane.png" // Using /Images/ path
          alt="plane"
          width={800}
          height={100}
          className="absolute top-20 left-20 z-10"
        />

        <Image
          src="/Images/logo2.png" // Using /Images/ path
          alt="roots n routes logo"
          width={200}
          height={50}
          className="absolute bottom-10 right-14 z-10"
        />
      </div>

      {/* Right side - Login form */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center p-8 sm:p-14"> {/* Updated div class and padding */}
        {/* Logo - Placed like confirmation page */}
        <Image
          src="/Images/logo.svg"
          alt="roots n routes logo"
          width={100}
          height={50}
          className="transition-transform duration-300 ease-out hover:scale-110 mb-5"
        />
        {/* Form Content Wrapper */}
        <div className="w-full max-w-md">
          {/* Removed old logo placements */}

          <h1 className="text-[#e09f3e] text-3xl font-medium mb-8 text-center">Sign in or Create account</h1> {/* Added text-center */}

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#282828] mb-1">
                Enter your email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@xyz.com"
                className="w-full border-[#d9d9d9]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-[#0e2f3c] hover:bg-[#0e273c] text-white py-6"
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Continue"}
            </Button>

            <div className="text-center text-[#828282] text-sm mt-6">Or sign in with</div>

            <div className="flex justify-center space-x-6 mt-4">
              <button className="p-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                    fill="#1976D2"
                  />
                </svg>
              </button>
              <button className="p-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                    fill="#1877F2"
                  />
                  <path
                    d="M15.5 12H13V9.5C13 8.948 13.448 8.5 14 8.5H15V6H13C11.343 6 10 7.343 10 9V12H8V14.5H10V22H13V14.5H14.5L15.5 12Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button className="p-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.05 12.536C17.0262 10.7446 17.9097 9.32226 19.6909 8.25909C18.7407 6.9416 17.3202 6.23807 15.4728 6.13464C13.7256 5.93464 11.8266 7.0416 11.1766 7.0416C10.4747 7.0416 8.77469 6.18285 7.45406 6.18285C4.69969 6.23107 1.74844 8.45909 1.74844 12.9916C1.74844 14.2737 1.94844 15.6 2.44844 16.9737C3.14844 18.8737 5.74219 23.0737 8.44219 22.9737C9.64219 22.9237 10.4922 22.0737 12.0922 22.0737C13.6422 22.0737 14.4422 22.9737 15.7922 22.9737C18.4922 22.9237 20.8422 19.1237 21.4922 17.2237C17.9922 15.5737 17.05 12.636 17.05 12.536Z"
                    fill="black"
                  />
                  <path
                    d="M14.7 4.5C15.6 3.4 16.3 1.8 16.1 0C14.7 0.1 13.1 0.9 12.1 2C11.2 3 10.4 4.6 10.6 6.3C12.1 6.4 13.7 5.6 14.7 4.5Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
