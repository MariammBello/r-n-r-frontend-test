"use client";

"use client"; // Removed duplicate "use client"

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // Import Input
import { Button } from "@/components/ui/button"; // Import Button
import { useRouter } from 'next/navigation'; // Import useRouter
import { forgotPasswordRequest as apiForgotPasswordRequest } from "@/lib/api/auth"; // Import the mock API function

// Renamed component for clarity
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter(); // Get router instance
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const [message, setMessage] = useState<string | null>(null); // Add success/info message state

  // Updated handler to call mock API
  const handleContinue = async () => { // Make async
    setIsLoading(true);
    setError(null);
    setMessage(null);
    console.log("Forgot password for:", email);

    // Call the mock API function
    const response = await apiForgotPasswordRequest(email);

    if (response.success) {
      // Navigate to confirmation page on success
      router.push(`/auth/verify?flowType=forgot&email=${encodeURIComponent(email || '')}`);
      // Optionally set a success message if staying on the page briefly
      // setMessage(response.message || 'OTP request sent.');
    } else {
      // Handle failure
      setError(response.error || 'Failed to send OTP. Please try again.');
      setIsLoading(false); // Set loading false on error
    }
    // Don't set isLoading false on success if navigating away immediately
  };

  return (
    <div className="flex h-screen font-sans flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 relative hidden sm:block">
        <Image
          src="/Images/flightimage.png"
          alt="plane image"
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
        {/* Form Content Wrapper */}
        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="text-[#e09f3e] text-3xl font-medium mb-8 text-center">
            Forgot your password?
          </h1>

          {/* Form elements matching the image */}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#282828] mb-1">
                Enter email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@xyz.com"
                className="w-full border-[#d9d9d9]" // Style consistent with sign-in
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Continue Button */}
            <Button
              className="w-full bg-[#0e2f3c] hover:bg-[#0e273c] text-white py-6"
              onClick={handleContinue}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Sending...' : 'Continue'}
            </Button>
            {/* Display error or success message */}
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            {message && <p className="text-green-600 text-sm text-center mt-2">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
