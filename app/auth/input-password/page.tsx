"use client";

import Image from "next/image";
import { useState, Suspense } from "react"; // Import Suspense
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { Input } from "@/components/ui/input"; // Import Input
import { Button } from "@/components/ui/button"; // Import Button
import Link from "next/link"; // Import Link
import { useRouter } from 'next/navigation'; // Import useRouter
import { useAuth } from "@/contexts/auth-context"; // Import useAuth only (sampleUser not needed here)
import { loginUser as apiLoginUser } from "@/lib/api/auth"; // Import the mock API function

// TODO: Add logic for password visibility toggle if needed
// import { Eye, EyeOff } from 'lucide-react';

// Define the form content as a separate component to easily wrap in Suspense
const InputPasswordFormContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Get router instance
  const { login } = useAuth(); // Get login function
  // const sampleUser = useSampleUser(); // Removed unused sample user
  const email = searchParams.get('email'); // Get email from URL query param
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  // const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // TODO: Implement actual sign-in logic with password verification
  const handleSignIn = async () => { // Make async
    setIsLoading(true); // Set loading true
    setError(null); // Clear previous errors
    console.log("Signing in with:", email, password);

    // Call the mock API function (which now simulates triggering OTP send)
    const response = await apiLoginUser(email, password);

    if (response.success) {
      // Navigate to verify page on success (OTP sent)
      router.push(`/auth/verify?flowType=signin&email=${encodeURIComponent(email || '')}`); // Corrected path
      // Don't set isLoading false here as we are navigating away
    } else {
      // Handle login failure (e.g., invalid credentials before OTP step)
      setError(response.error || 'Login failed. Please try again.');
      setIsLoading(false); // Set loading false on error
    }
  };

  return (
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
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
          {/* Display error message if login fails */}
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default function InputPasswordPage() {
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

      {/* Right side - Form wrapped in Suspense */}
      <Suspense fallback={<div className="w-full sm:w-1/2 flex justify-center items-center"><p>Loading form...</p></div>}>
        <InputPasswordFormContent />
      </Suspense>
    </div>
  );
}
