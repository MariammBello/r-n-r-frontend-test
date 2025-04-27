"use client";

import { useState, Suspense } from "react"; // Import Suspense
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { Input } from "@/components/ui/input"; // Import Input
import { Button } from "@/components/ui/button"; // Import Button
import Link from "next/link"; // Import Link
import { useRouter } from 'next/navigation'; // Import useRouter
import { useAuth } from "@/contexts/auth-context"; // Import useAuth only (sampleUser not needed here)
import { loginUser as apiLoginUser } from "@/lib/api/auth"; // Import the mock API function
import AuthFormContainer from "@/components/auth-form-container"; // Import the new container
import React from 'react'; // Import React for event types
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Import icons

// Define the form content as a separate component to easily wrap in Suspense
const InputPasswordFormContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Get router instance
  const { login } = useAuth(); // Get login function
  // const sampleUser = useSampleUser(); // Removed unused sample user
  const email = searchParams.get('email'); // Get email from URL query param
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // General API error
  const [errors, setErrors] = useState<Record<string, string>>({}); // Field-specific validation errors

  // Basic validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!password) {
      newErrors.password = "Password is required.";
    }
    // Add more validation if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSignIn = async () => { // Make async
    setError(null); // Clear previous general errors
    setErrors({}); // Clear previous validation errors

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsLoading(true); // Set loading true
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
    <AuthFormContainer title="Input your password">
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
                  type={showPassword ? "text" : "password"} // Dynamically set type
                  placeholder="Enter Password"
                  className={`w-full border-[#d9d9d9] pr-10 ${errors.password ? 'border-red-500' : ''}`} // Add padding for icon
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
               />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
               >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
               </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.password}</p>}
            {/* Forgot Password Link */}
            <div className="text-right mt-1"> {/* Reduced margin slightly */}
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
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          {/* Display general API error message if login fails */}
          {error && <p className="text-red-500 text-sm text-center mt-2" aria-live="assertive">{error}</p>}
        </div>
    </AuthFormContainer>
  );
};

export default function InputPasswordPage() {
  // The outer div and left panel are now handled by app/auth/layout.tsx
  return (
    // Right side - Form wrapped in Suspense
    <Suspense fallback={<div className="w-full sm:w-1/2 flex justify-center items-center"><p>Loading form...</p></div>}>
      <InputPasswordFormContent />
    </Suspense>
  );
}
