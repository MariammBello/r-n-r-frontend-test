"use client";

"use client"; // Removed duplicate "use client"

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // Import Input
import { Button } from "@/components/ui/button"; // Import Button
import { useRouter } from 'next/navigation'; // Import useRouter

// Renamed component for clarity
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter(); // Get router instance

  // TODO: Add API call here to actually initiate password reset
  const handleContinue = () => {
    console.log("Forgot password for:", email);
    // Navigate to confirmation page with parameters
    router.push(`/auth/confirmation?flowType=forgot&email=${encodeURIComponent(email)}`);
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
              // disabled={isLoading} // Add loading state if needed
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
