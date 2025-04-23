// pages/index.js or any other page
"use client";

// app/logout/page.tsx

import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here
    // For example: clear cookies, local storage, etc.
    console.log('User confirmed logout');
    
    // Redirect to login page or home page after logout
    router.push('/login');
  };

  const handleCancel = () => {
    // Go back to previous page
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          {/* Header with X icon */}
          <div className="p-6">
            <div className="flex justify-start mb-4">
           
            </div>
            
            {/* Content */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Are you sure you want to log out?
              </h2>
            </div>
            
            {/* Button group */}
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}