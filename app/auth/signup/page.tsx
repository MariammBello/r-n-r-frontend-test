"use client";

import Image from "next/image";
import { useState, Suspense } from "react"; // Import Suspense
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Assuming you have a Select component in ui, otherwise use standard select
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import { useSearchParams } from 'next/navigation';
import { signupUser as apiSignupUser } from "@/lib/api/auth";

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignupSubmit = async () => {
      setIsLoading(true);
      setError(null);

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
            Complete Sign Up
          </h1>

          {/* Form elements matching the image */}
          <div className="space-y-4"> {/* Adjusted spacing */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#282828] mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                className="w-full border-[#d9d9d9]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#282828] mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                className="w-full border-[#d9d9d9]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-[#282828] mb-1">
                Gender
              </label>
              {/* Using standard select for now, replace with shadcn/ui Select if available */}
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-[#d9d9d9] rounded-md px-3 py-2 bg-white text-sm h-10" // Basic styling
              >
                <option value="" disabled>Choose</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
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
                onChange={(e) => setNationality(e.target.value)}
                className="w-full border border-[#d9d9d9] rounded-md px-3 py-2 bg-white text-sm h-10" // Basic styling
              >
                <option value="" disabled>Choose</option>
                {/* TODO: Populate with actual nationalities */}
                <option value="nigerian">Nigerian</option>
                <option value="ghanaian">Ghanaian</option>
                <option value="american">American</option>
                <option value="british">British</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#282828] mb-1">
                Password
              </label>
              <div className="relative">
                 <Input
                    id="password"
                    type="password" // Use state for type if implementing show/hide
                    className="w-full border-[#d9d9d9] pr-10" // Add padding for potential icon
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                 {/* TODO: Add show/hide password icon button if needed */}
              </div>
            </div>

            {/* Continue Button */}
            <Button
              className="w-full bg-[#0e2f3c] hover:bg-[#0e273c] text-white py-6 mt-6" // Added top margin
              onClick={handleSignupSubmit}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Signing Up...' : 'Continue'}
            </Button>
            {/* Display error message if signup fails */}
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          </div>
        </div>
      </div>
    );
  };

export default function SignUpPage() {
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
        <SignUpFormContent />
      </Suspense>
    </div>
  );
}
