"use client";

import { useState, Suspense } from "react"; // Import Suspense
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Assuming you have a Select component in ui, otherwise use standard select
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import { useSearchParams } from 'next/navigation';
import { signupUser as apiSignupUser } from "@/lib/api/auth";
import AuthFormContainer from "@/components/auth-form-container"; // Import the new container
import { NATIONALITIES } from "@/lib/constants/nationalities"; // Import nationalities
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Import icons, add Loader2
import React from 'react'; // Import React for event types

// Interface for form values (good practice, even with separate states)
interface SignUpFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  nationality: string;
  password: string;
}

// Define the form content as a separate component to easily wrap in Suspense
// Moved this component definition outside the main SignUpPage component
const SignUpFormContent = () => {
  // All the state and handlers that were previously directly in SignUpPage
    const router = useRouter();
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // General API error
    const [errors, setErrors] = useState<Record<string, string>>({}); // Field-specific validation errors

    // Basic validation function
    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      if (!firstName) newErrors.firstName = "First name is required.";
      if (!lastName) newErrors.lastName = "Last name is required.";
      if (!gender) newErrors.gender = "Gender is required.";
      if (!nationality) newErrors.nationality = "Nationality is required.";
      if (!password) {
        newErrors.password = "Password is required.";
      } else if (password.length < 8) { // Example: Basic password strength
        newErrors.password = "Password must be at least 8 characters long.";
      }
      // Add more validation rules as needed (e.g., password complexity)
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSignupSubmit = async () => {
      setError(null); // Clear previous general errors
      setErrors({}); // Clear previous validation errors

      if (!validateForm()) {
        return; // Stop submission if validation fails
      }

      setIsLoading(true);

      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email, // Use email from searchParams
        gender,
        nationality,
        password
      };

      console.log("Signing up with:", userData);
      const response = await apiSignupUser(userData);

      if (response.success) {
        console.log("Mock signup success, logging in and redirecting home...");
        login({
           id: 'new-user-' + Date.now(),
           name: `${firstName} ${lastName}`,
           email: email || 'newuser@example.com',
           avatar: '/placeholder.svg?height=40&width=40',
           role: 'New User',
           verified: true
        });
        router.push('/');
      } else {
        setError(response.error || 'Signup failed. Please try again.');
        setIsLoading(false);
      }
    };

    return (
      <AuthFormContainer title="Complete Sign Up">
        {/* Form elements matching the image */}
        <div className="space-y-4"> {/* Adjusted spacing */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#282828] mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                className={`w-full border-[#d9d9d9] ${errors.firstName ? 'border-red-500' : ''}`}
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.firstName}</p>}
            </div>

            <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#282828] mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                className={`w-full border-[#d9d9d9] ${errors.lastName ? 'border-red-500' : ''}`}
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-[#282828] mb-1">
                Gender
              </label>
              {/* Using standard select for now, replace with shadcn/ui Select if available */}
              <select
                id="gender"
                value={gender}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                className={`w-full border border-[#d9d9d9] rounded-md px-3 py-2 bg-white text-sm h-10 ${errors.gender ? 'border-red-500' : ''}`} // Basic styling
              >
                <option value="" disabled>Choose</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.gender}</p>}
              {/* Example using shadcn/ui Select removed to fix syntax errors */}
            </div>

             <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-[#282828] mb-1">
                Nationality
              </label>
              {/* Using standard select for now */}
               <select
                id="nationality"
                value={nationality}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNationality(e.target.value)}
                className={`w-full border border-[#d9d9d9] rounded-md px-3 py-2 bg-white text-sm h-10 ${errors.nationality ? 'border-red-500' : ''}`} // Basic styling
              >
                <option value="" disabled>Choose</option>
                {NATIONALITIES.map((nat) => (
                  <option key={nat.value} value={nat.value}>
                    {nat.label}
                  </option>
                ))}
              </select>
              {errors.nationality && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.nationality}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#282828] mb-1">
                Password
              </label>
              <div className="relative">
                 <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // Dynamically set type
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
            </div>

            {/* Continue Button */}
            <Button
              className="w-full bg-[#0e2f3c] hover:bg-[#0e273c] text-white py-6 mt-6" // Added top margin
              onClick={handleSignupSubmit}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing Up...
                </>
              ) : (
                'Continue'
              )}
            </Button>
            {/* Display general API error message if signup fails */}
            {error && <p className="text-red-500 text-sm text-center mt-2" aria-live="assertive">{error}</p>}
          </div>
      </AuthFormContainer>
    );
  };

export default function SignUpPage() {
  // The outer div and left panel are now handled by app/auth/layout.tsx
  return (
    // Right side - Form wrapped in Suspense
    <Suspense fallback={<div className="w-full sm:w-1/2 flex justify-center items-center"><p>Loading form...</p></div>}>
      <SignUpFormContent />
    </Suspense>
  );
}
