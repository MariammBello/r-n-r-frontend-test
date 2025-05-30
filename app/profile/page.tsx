"use client";

import { useState, useEffect, Suspense, useMemo } from "react"; // Import useEffect, Suspense, and useMemo
import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
import { FaCheckCircle, FaEdit, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProfileSidebar from "@/components/profile-sidebar";
import PersonalInfoForm from "@/components/personal-info-form";
import WorkInProgress from "@/components/work-in-progress";
import { useAuth } from "@/contexts/auth-context"; // Import useAuth

// Component containing the main profile content logic, dependent on searchParams
const ProfileContent = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const currentSection = searchParams.get('section') || 'personal-info';

  const [isEditing, setIsEditing] = useState(false);
  // Sidebar state is managed in the parent for now, might need adjustment
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Helper function to split name (can be improved for edge cases)
  const getNames = (fullName: string | undefined | null): { firstName: string, lastName: string } => {
    const names = fullName?.trim().split(' ') || [];
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || ''; // Handle multiple last names
    return { firstName, lastName };
  };

  // Initialize formData based on user context or default values
  const initialNames = getNames(user?.name);
  const [formData, setFormData] = useState({
    firstName: initialNames.firstName, // Use split name
    lastName: initialNames.lastName,   // Use split name
    email: user?.email || '',
    status: user?.role || 'Wanderer', // Example mapping
    avatarUrl: user?.avatar || '',
    dob: "24 Dec 1992", // Keep placeholders for data not in context yet
    nationality: "Nigerian",
    gender: "Female", // Placeholder
    phoneCountryCode: "+234", // Placeholder
    phoneNumber: "8012345678", // Placeholder
    emergencyCountryCode: "+234", // Placeholder
    emergencyNumber: "812345678", // Placeholder
    verificationType: "International Passport" as "International Passport" | "Driver's License" | "National ID" | undefined, // Reverted type assertion
    idNumber: "", // Placeholder
    // Add other fields from PersonalInfoFormData interface as needed
    country: "Nigeria", // Placeholder
    languages: ["English"], // Placeholder
    petOwner: "No" as "Yes" | "No" | undefined, // Explicitly type the placeholder
    address: "123 Main St", // Placeholder
    state: "Lagos", // Placeholder
    city: "Ikeja", // Placeholder
    zipcode: "100001", // Placeholder
    countriesVisited: ["Ghana"], // Placeholder
    countriesToVisit: ["Kenya"], // Placeholder
    about: `Placeholder about text for ${user?.name || 'user'}.`,
    // Correctly map boolean to string literal type
    verificationStatus: user?.verified ? 'Verified' : 'Not Verified' as 'Verified' | 'Not Verified' | 'Pending' | undefined,
  });

  // Redirect if not authenticated
  useEffect(() => {
    // Redirect immediately if not authenticated (can cause flash, but avoids isLoading dependency)
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
    // Update formData when user data is available
     if (user) {
        const currentNames = getNames(user.name);
        setFormData(prev => ({
          ...prev,
          firstName: currentNames.firstName || prev.firstName, // Update split name
          lastName: currentNames.lastName || prev.lastName,   // Update split name
          email: user.email || prev.email,
          status: user.role || prev.status, // Assuming role maps to status
          avatarUrl: user.avatar || prev.avatarUrl,
         // Correctly map boolean to string literal type
         verificationStatus: user.verified ? 'Verified' : 'Not Verified' as 'Verified' | 'Not Verified' | 'Pending' | undefined,
       }));
    }
    // Only re-run if auth state or user object changes
  }, [isAuthenticated, user, router]);


  // Update type annotation to include Textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData);
  };

   // Show loading state or null if redirecting
   // Removed isLoading check
   if (!isAuthenticated) {
     // Or return a dedicated loading component
     return <div className="flex justify-center items-center min-h-screen">Redirecting...</div>;
   }

  // Function to render the correct content based on the section
  const renderSection = () => {
    switch (currentSection) {
      case 'personal-info':
        return (
          <PersonalInfoForm
            formData={formData}
            isEditing={isEditing}
            onFormDataChange={handleChange}
          />
        );
      case 'payment-methods':
      case 'reservations':
      case 'referrals':
      case 'security':
      case 'settings':
      case 'help':
        // Use WorkInProgress component for other sections for now
        return <WorkInProgress pageName={currentSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} />; // Format section name
      default:
        return <p>Section not found.</p>; // Fallback
    }
  };

  return (
    // Main Content Area - This part depends on searchParams
    <main className="w-full md:w-3/4 lg:w-4/5 p-4 md:p-8 md:pl-72"> {/* Added padding-left to account for fixed sidebar width */}

      {/* Breadcrumbs (Placeholder) */}
      <div className="mb-4 text-sm text-gray-500">
             {/* TODO: Make Breadcrumbs dynamic based on currentSection */}
             Breadcrumbs Placeholder
          </div>

          {/* Title can also be dynamic later */}
          {/* <h1 className="text-2xl font-semibold mb-6">Personal Information</h1> */}

          {/* Render the dynamic section content */}
          <div className="bg-white p-6 rounded shadow mt-4">
             {/* Conditionally render Edit/Save buttons only for personal-info */}
             {currentSection === 'personal-info' && (
               <>
                 <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                   {/* User info display removed from here, now handled in form */}
                   {/* Edit/Cancel Button */}
                   <button
                     className="bg-slate-800 text-white h-11 px-5 rounded flex items-center hover:bg-amber-500 hover:text-slate-800" // Removed margin top
                     onClick={() => setIsEditing(!isEditing)}
                   >
                     {isEditing ? "Cancel" : "Edit"}
                     {!isEditing && <FaEdit className="ml-2" />}
                   </button>
                 </div>
                 <div className="border-t pt-6">
                   {renderSection()} {/* Render the form or other section */}
                 </div>
               </>
             )}

             {/* Render other sections directly if no edit button needed */}
              {currentSection !== 'personal-info' && renderSection()}


            {/* Save button - only show when editing personal-info */}
            {currentSection === 'personal-info' && isEditing && (
              <button
                className="mt-6 bg-amber-500 text-slate-800 p-2 rounded w-full hover:bg-amber-600"
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}
          </div>
        </main>
  );
};


export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth(); // Auth check can happen here
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state managed here

  // Redirect if not authenticated (can happen early)
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  // Simplified initial data for sidebar before ProfileContent loads fully
  const sidebarUserData = useMemo(() => ({
    name: user?.name || 'Loading...',
    email: user?.email || '',
    status: user?.role || '',
    avatarUrl: user?.avatar || '',
    isVerified: user?.verified || false,
  }), [user]);


  if (!isAuthenticated) {
    return <div className="flex justify-center items-center min-h-screen">Redirecting...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header - Full width at the top */}
      <Header />

      {/* Main content area with Sidebar and Form */}
      <div className="flex flex-1 container mx-auto py-8 px-4 md:px-0"> {/* Added container and padding */}

        {/* Toggle Button for Sidebar (Mobile) */}
        <button
          className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-md shadow" // Adjusted positioning
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars className="text-xl" />
        </button>

        {/* Sidebar Component - Pass user data */}
         <ProfileSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            userData={sidebarUserData} // Use memoized data
           // Pass wallet data later
        />

        {/* Main Content Area wrapped in Suspense */}
        <Suspense fallback={<main className="w-full md:w-3/4 lg:w-4/5 p-4 md:p-8 md:pl-72"><p>Loading profile section...</p></main>}>
          <ProfileContent />
        </Suspense>

      </div>

      {/* Footer - Full width at the bottom */}
      <Footer />
    </div>
  );
}
