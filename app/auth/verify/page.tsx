"use client"; // Removed duplicate "use client"

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // Import Input
import { Button } from "@/components/ui/button"; // Import Button
import Link from "next/link"; // Import Link for routing
import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams and useRouter
import { useAuth } from "@/contexts/auth-context"; // Import auth context (removed useSampleUser)
import { verifyOtp as apiVerifyOtp } from "@/lib/api/auth"; // Import the mock API function

// Renamed component for clarity
export default function ConfirmationPage() {
  const [otp, setOtp] = useState(""); // State for OTP input
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const searchParams = useSearchParams();
  const router = useRouter(); // Get router instance
  const { login } = useAuth(); // Get login function from context
  // const sampleUser = useSampleUser(); // Removed unused sample user
  // Read flowType and email from URL params
  const flowType = searchParams.get('flowType'); // e.g., 'signup', 'signin', 'forgot'
  const email = searchParams.get('email');
  // Determine heading based on flowType
  const headingText = flowType === 'signup' ? "Let's confirm your mail" : "Let's confirm it's you";

  // Handler for Sign In with Password button
  const handleSignInWithPassword = () => {
    if (email) {
      router.push(`/auth/input-password?email=${encodeURIComponent(email)}`);
    } else {
      // Handle case where email is missing, maybe redirect to login
      console.error("Email parameter missing for password sign-in");
      router.push('/auth/login'); // Updated path
    }
  };

  // Updated handler for Continue button
  const handleContinue = async () => { // Make async
    setIsLoading(true); // Set loading true
    setError(null); // Clear previous errors
    console.log("Verifying OTP:", otp);

    // Call the mock verify OTP API function
    const response = await apiVerifyOtp(email, otp);

    if (response.success && response.data?.user) {
      // If OTP is valid, check the flow type
      if (flowType === 'signup') {
        // For new users, navigate to the signup completion page
        // We don't log them in yet, they need to complete signup
        if (email) {
          router.push(`/auth/signup?email=${encodeURIComponent(email)}`);
        } else {
          console.error("Email parameter missing for signup flow");
          // Redirect to login or signup start page if email is lost
          router.push('/auth/login'); // Updated path
        }
      } else {
        // For existing users (signin, forgot password), log them in
        login(response.data.user); // Use user data from verify response
        // Navigate to homepage
        router.push('/');
      }
      // Don't set isLoading false on successful navigation
    } else {
      // Handle OTP verification failure
      setError(response.error || 'OTP verification failed. Please try again.');
      setIsLoading(false); // Set loading false on error
    }
  };

  return (
    <div className="flex h-screen font-sans flex-col sm:flex-row">
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

      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-6 sm:p-14">
        <Image
          src="/Images/logo.svg"
          alt="roots n routes logo"
          width={100}
          height={50}
          className="transition-transform duration-300 ease-out hover:scale-110 mb-5"
        />
        {/* Form Content Wrapper - Added for consistency */}
        <div className="w-full max-w-md">
          {/* Conditional Heading */}
          <h1 className="text-[#e09f3e] text-3xl font-medium mb-8 text-center">
            {headingText}
          </h1>

          {/* Form elements matching the image */}
          <div className="space-y-6">
            <div>
              {/* Instruction Text with Email */}
              <label htmlFor="otp" className="block text-sm font-medium text-[#282828] mb-1 text-center">
                Enter the 6-digit verification code sent to: <br />
                <span className="font-semibold">{email || "your email"}</span>
              </label>
              {/* OTP Input */}
              <Input
                id="otp"
                type="text" // Or "number" if preferred, but text allows more flexibility
                placeholder="6-digit code" // Updated placeholder
                className="w-full border-[#d9d9d9] text-center" // Added text-center
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6} // Assuming 6-digit OTP
              />
              {/* Resend Code Link - Removed text-right */}
              <div className="mt-4 text-center">
                <button className="text-sm font-medium text-[#0e2f3c] hover:underline">
                  Resend Code
                </button>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              className="w-full bg-[#0e2f3c] hover:bg-[#0e273c] text-white py-6"
              onClick={handleContinue} // Attach the handler
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Verifying...' : 'Continue'}
            </Button>
            {/* Display error message if OTP verification fails */}
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            {/* Conditionally render Sign In with Password Button for 'signin' flow */}
            {flowType === 'signin' && (
              <Button
                variant="outline"
                className="w-full bg-[#e09f3e] hover:bg-[#d08f2e] text-[#0e2f3c] border-[#e09f3e] hover:border-[#d08f2e] py-6"
                onClick={handleSignInWithPassword} // Attach the handler
              >
                Sign In with Password
              </Button>
            )}

            {/* Conditionally render Contact Help Center link for 'forgot' flow */}
            {flowType === 'forgot' && (
               <p className="mt-4 text-center text-sm text-[#4f4f4f]">
                 Still can't log in?{' '}
                 <Link href="/help" className="underline font-semibold text-[#0e2f3c] hover:text-[#0a2530]">
                   Contact our help center
                 </Link>
               </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
