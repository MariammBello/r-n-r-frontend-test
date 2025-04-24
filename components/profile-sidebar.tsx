"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For avatar
import { FaCheckCircle, FaTimes } from 'react-icons/fa'; // Or use Lucide icons if preferred
import { Button } from '@/components/ui/button'; // For Log Out button
import { Card, CardContent } from '@/components/ui/card'; // For wallet cards

// Define props for the sidebar
interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void; // Function to close sidebar on mobile
  // Add props for user data and wallet data later
  userData?: {
    name: string;
    email: string;
    status: string;
    avatarUrl?: string; // Optional avatar URL
    isVerified?: boolean;
  };
  walletData?: {
    nairaBalance: string; // Format as needed (e.g., "₦10,000,000.00")
    usdBalance: string; // Format as needed (e.g., "£50,000.00") - Assuming pounds based on symbol
  };
}

// Placeholder data for demonstration
const defaultUserData = {
  name: "Sarah Philips",
  email: "sarah@xyz.com",
  status: "Certified Wanderer",
  avatarUrl: "/images/avatar-placeholder.png", // Replace with actual placeholder or logic
  isVerified: true,
};

const defaultWalletData = {
  nairaBalance: "₦10,000,000.00",
  usdBalance: "£50,000.00", // Assuming pounds based on design symbol
};

// Navigation items using query params for sections
const navItems = [
  { href: "/profile?section=personal-info", label: "Personal Information" },
  { href: "/profile?section=payment-methods", label: "Payment Methods" },
  { href: "/profile?section=reservations", label: "Reservations & Trips" },
  { href: "/profile?section=referrals", label: "Referrals & Rewards" },
  { href: "/profile?section=security", label: "Security & Privacy" },
  { href: "/profile?section=settings", label: "Settings & Preferences" },
  { href: "/profile?section=help", label: "Help & Feedback" },
];

export default function ProfileSidebar({
  isOpen,
  onClose,
  userData = defaultUserData, // Use default data if no props passed
  walletData = defaultWalletData,
}: ProfileSidebarProps) {
  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } md:block fixed md:sticky top-0 md:top-24 left-0 z-40 bg-white w-64 md:w-1/4 lg:w-1/5 h-full md:h-[calc(100vh-6rem)] border-r p-6 shadow-md overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full' // Slide in/out on mobile
      }`}
      aria-label="Profile Sidebar"
    >
      {/* Close Button on Mobile */}
      <div className="flex justify-end md:hidden mb-4">
        <button onClick={onClose} aria-label="Close sidebar">
          <FaTimes className="text-2xl text-gray-500 hover:text-gray-800" />
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center md:items-start w-full mb-6">
        <div className="relative mb-3">
          <Image
            src={userData.avatarUrl || "/images/avatar-placeholder.png"} // Fallback placeholder
            alt={`${userData.name}'s avatar`}
            width={64}
            height={64}
            className="rounded-full object-cover border-2 border-gray-200"
          />
          {/* Add edit icon overlay later if needed */}
        </div>
        <h2 className="text-lg font-bold text-center md:text-left text-[#0e2f3c]">
          {userData.name} {userData.isVerified && <FaCheckCircle className="inline text-green-500 ml-1" />}
        </h2>
        <p className="text-sm text-gray-500 text-center md:text-left">
          {userData.email}
        </p>
        <p className="text-xs text-amber-600 font-medium text-center md:text-left mt-1">
          {userData.status}
        </p>
      </div>

      {/* Wallet Cards */}
      <div className="mb-6 space-y-3">
        {/* Card 1 */}
        <Card className="bg-gradient-to-br from-blue-900 to-blue-700 text-white shadow-md overflow-hidden">
          <CardContent className="p-4">
            <p className="text-sm opacity-80 mb-1">Wallet Balance</p>
            <p className="text-xl font-semibold">{walletData.nairaBalance}</p>
          </CardContent>
        </Card>
        {/* Card 2 */}
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-300 text-yellow-900 shadow-md overflow-hidden">
          <CardContent className="p-4">
            <p className="text-sm opacity-80 mb-1">Wallet Balance</p>
            <p className="text-xl font-semibold">{walletData.usdBalance}</p>
          </CardContent>
        </Card>
        {/* Add carousel controls if needed */}
      </div>


      {/* Navigation Links */}
      <nav className="w-full">
        <ul className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                // Add logic for active link styling later
                className="block p-3 text-gray-700 hover:bg-amber-100 hover:text-amber-700 rounded-md font-medium transition-colors duration-150"
                onClick={onClose} // Close sidebar on link click (mobile)
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Button
              variant="ghost"
              className="p-3 text-red-600 hover:bg-red-100 hover:text-red-700 w-full justify-start font-medium"
              // Add logout functionality later
            >
              Log Out
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
