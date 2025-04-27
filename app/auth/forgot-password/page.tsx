"use client";

"use client"; // Removed duplicate "use client"

import { useState } from "react";
import { Input } from "@/components/ui/input"; // Import Input
import { Button } from "@/components/ui/button"; // Import Button
import { useRouter } from 'next/navigation'; // Import useRouter
import { forgotPasswordRequest as apiForgotPasswordRequest } from "@/lib/api/auth"; // Import the mock API function
import AuthFormContainer from "@/components/auth-form-container"; // Import the new container
import React from 'react'; // Import React for event types
import { Loader2 } from 'lucide-react'; // Import Loader2

// Renamed component for clarity
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter(); // Get router instance
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // General API error state
  const [errors, setErrors] = useState<Record<string, string>>({}); // Field-specific validation errors
  const [message, setMessage] = useState<string | null>(null); // Add success/info message state

  // Updated handler to call mock API
  const handleContinue = async () => { // Make async
    setIsLoading(true);
    setError(null);
    setMessage(null);
    setErrors({}); // Clear previous validation errors
    console.log("Forgot password for:", email);

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Simple email format check
      newErrors.email = "Please enter a valid email address.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false); // Stop loading if validation fails
      return;
    }

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

  // The outer div and left panel are handled by app/auth/layout.tsx
  // The right-side container structure is handled by AuthFormContainer
  return (
    <AuthFormContainer title="Forgot your password?">
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
                className={`w-full border-[#d9d9d9] ${errors.email ? 'border-red-500' : ''}`} // Style consistent with sign-in
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.email}</p>}
            </div>

            {/* Continue Button */}
            <Button
              className="w-full bg-[#0e2f3c] hover:bg-[#0e273c] text-white py-6"
              onClick={handleContinue}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Continue'
              )}
            </Button>
            {/* Display validation errors (handled above), API error or success message */}
            {error && <p className="text-red-500 text-sm text-center mt-2" aria-live="assertive">{error}</p>}
            {message && <p className="text-green-600 text-sm text-center mt-2" aria-live="polite">{message}</p>}
          </div>
    </AuthFormContainer>
  );
}
