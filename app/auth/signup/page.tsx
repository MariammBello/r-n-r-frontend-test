"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Assuming you have a Select component in ui, otherwise use standard select
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context"; // Removed useSampleUser
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { signupUser as apiSignupUser } from "@/lib/api/auth"; // Import the mock API function

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();
  // const sampleUser = useSampleUser(); // Removed sample user
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Get email from URL

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  // const [showPassword, setShowPassword] = useState(false); // Optional: for show/hide password

  // Placeholder submit handler
  const handleSignupSubmit = async () => { // Make async
    setIsLoading(true); // Set loading true
    setError(null); // Clear previous errors

    const userData = {
      first_name: firstName, // Match backend service naming
      last_name: lastName,   // Match backend service naming
      email: email,          // Include email from previous step
      gender,
      nationality,
      password
    };

    console.log("Signing up with:", userData);

    // Call the mock API function
    const response = await apiSignupUser(userData);

    if (response.success) {
      // Signup successful (mock response)
      // Simulate login immediately after signup and redirect home
      console.log("Mock signup success, logging in and redirecting home...");
      login({ // Manually create a user object for the context
         id: 'new-user-' + Date.now(), // Generate temporary ID
         name: `${firstName} ${lastName}`,
         email: email || 'newuser@example.com', // Use email if available
         avatar: '/placeholder.svg?height=40&width=40', // Default avatar
         role: 'New User', // Default role
         verified: true // Assume verified after completing signup form
      });
      router.push('/'); // Redirect to homepage
      // Don't set isLoading false here as we are navigating away
    } else {
      // Handle signup failure
      setError(response.error || 'Signup failed. Please try again.');
      setIsLoading(false); // Set loading false on error
    }
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
              {/* Example using shadcn/ui Select (uncomment and adapt if available)
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full border-[#d9d9d9]">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              */}
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
    </div>
  );
}
