"use client";

import { useState, Suspense } from "react"; // Import Suspense
import { Input } from "@/components/ui/input"; // Import Input
import { Button } from "@/components/ui/button"; // Import Button
import Link from "next/link"; // Import Link for routing
import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams and useRouter
import { useAuth } from "@/contexts/auth-context"; // Import auth context (removed useSampleUser)
import { verifyOtp as apiVerifyOtp } from "@/lib/api/auth"; // Import the mock API function
import AuthFormContainer from "@/components/auth-form-container"; // Import the new container
import React from 'react'; // Import React for event types
import { Loader2 } from 'lucide-react'; // Import Loader2

// Define the form content as a separate component
const VerifyFormContent = () => {
  const [otp, setOtp] = useState(""); // State for OTP input
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // General API error state
  const [errors, setErrors] = useState<Record<string, string>>({}); // Field-specific validation errors
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

  // Basic validation function (moved outside handleContinue)
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!otp) {
      newErrors.otp = "Verification code is required.";
    } else if (otp.length !== 6 || !/^\d+$/.test(otp)) { // Check if 6 digits
      newErrors.otp = "Please enter a valid 6-digit code.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Updated handler for Continue button
  const handleContinue = async () => { // Make async
    setError(null); // Clear previous general errors
    setErrors({}); // Clear previous validation errors

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsLoading(true); // Set loading true
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

  // The outer div and left panel are handled by app/auth/layout.tsx
  // The right-side container structure is handled by AuthFormContainer
  return (
    <AuthFormContainer title={headingText}>
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
                className={`w-full border-[#d9d9d9] text-center ${errors.otp ? 'border-red-500' : ''}`} // Added text-center
                value={otp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                maxLength={6} // Assuming 6-digit OTP
              />
              {errors.otp && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.otp}</p>}
            </div> {/* Close the div containing label, input, and error */}
            {/* Resend Code Link - Moved outside the input div */}
            <div className="mt-4 text-center">
                <button className="text-sm font-medium text-[#0e2f3c] hover:underline">
                  Resend Code
                </button>
              </div>
            {/* Removed extra closing div here */}

            {/* Continue Button */}
            <Button
              className="w-full bg-[#0e2f3c] hover:bg-[#0e273c] text-white py-6"
              onClick={handleContinue} // Attach the handler
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Continue'
              )}
            </Button>
            {/* Display general API error message if OTP verification fails */}
            {error && <p className="text-red-500 text-sm text-center mt-2" aria-live="assertive">{error}</p>}

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
    </AuthFormContainer>
  );
};

// Main page component wraps the form content in Suspense
export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex h-screen justify-center items-center"><p>Loading verification form...</p></div>}>
      <VerifyFormContent />
    </Suspense>
  );
}
