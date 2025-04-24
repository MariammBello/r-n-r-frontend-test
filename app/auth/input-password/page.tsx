"use client";

import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { Input } from "@/components/ui/input"; // Import Input
import { Button } from "@/components/ui/button"; // Import Button
import Link from "next/link"; // Import Link
import { useRouter } from 'next/navigation'; // Import useRouter
import { useAuth, useSampleUser } from "@/contexts/auth-context"; // Import auth context

// TODO: Add logic for password visibility toggle if needed
// import { Eye, EyeOff } from 'lucide-react';

export default function InputPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Get router instance
  const { login } = useAuth(); // Get login function
  const sampleUser = useSampleUser(); // Get sample user data
  const email = searchParams.get('email'); // Get email from URL query param
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // TODO: Implement actual sign-in logic with password verification
  const handleSignIn = () => {
    console.log("Signing in with:", email, password);
    // Simulate successful password verification by logging in the sample user
    login(sampleUser);
    // Navigate to homepage
    router.push('/');
  };

  return (
    <div className="flex h-screen font-sans flex-col sm:flex-row">
      {/* Left side - Consistent with other auth pages */}
      <div className="w-full sm:w-1/2 relative hidden sm:block">
        <Image
          src="/Images/flightimage.png"
          alt="Aerial view with world map"
          fill
          className="object-cover"
        />
        <Image
          src="/Images/plane.png"
          alt="plane"
          width={800}
          height={100}
          className="absolute top-20 left-20 z-10"
        />
        <Image
          src="/Images/logo2.png"
          alt="roots n routes logo"
          width={200}
          height={50}
          className="absolute bottom-10 right-14 z-10"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-6 sm:p-14">
        {/* Logo */}
        <Image
          src="/Images/logo.svg"
          alt="roots n routes logo"
          width={100}
          height={50}
          className="transition-transform duration-300 ease-out hover:scale-110 mb-5"
        />
        {/* Form Content Wrapper */}
        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="text-[#e09f3e] text-3xl font-medium mb-8 text-center">
            Input your password
          </h1>

          {/* Form elements matching the image */}
          <div className="space-y-6">
            <div>
              {/* Display Email */}
              {email && (
                <p className="block text-sm font-medium text-[#282828] mb-1 text-center">
                  {email}
                </p>
              )}
              {/* Password Input */}
              <div className="relative">
                 <Input
                    id="password"
                    type="password" // Use state for type if implementing show/hide
                    placeholder="Enter Password"
                    className="w-full border-[#d9d9d9] pr-10" // Add padding for potential icon
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                 {/* TODO: Add show/hide password icon button if needed
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                 >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
                 */}
              </div>
              {/* Forgot Password Link */}
              <div className="text-right mt-2">
                <Link href="/auth/forgot-password" className="text-sm font-medium text-[#0e2f3c] hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              className="w-full bg-[#0e2f3c] hover:bg-[#0e273c] text-white py-6"
              onClick={handleSignIn}
              // disabled={isLoading} // Add loading state if needed
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
