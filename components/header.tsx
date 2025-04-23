"use client"

import Link from "next/link";
import Logo from "@/components/logo";
import { ChevronDown, type LucideIcon } from "lucide-react"; // Import LucideIcon type
import { useAuth } from "@/contexts/auth-context";

import UserProfileButton from "@/components/user-profile-button";
import {
  solutionsNavItems,
  resourcesNavItems,
  opportunityNavItems,
  type NavItem, // Import the NavItem type
} from "@/lib/navigationData"; // Import the navigation data

// Helper component for dropdown menu items
const DropdownMenuItem = ({ item }: { item: NavItem }) => (
  <Link
    href={item.href}
    className="flex items-start space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors"
  >
    <div
      className={`flex-shrink-0 w-12 h-12 ${item.bgColorClass} rounded-lg flex items-center justify-center`}
    >
      <item.Icon className="w-6 h-6 text-[#0e2f3c]" /> {/* Use Icon component */}
    </div>
    <div>
      <h3 className="text-[#0e2f3c] font-bold text-lg">{item.title}</h3>
      <p className="text-[#4f4f4f] text-sm">{item.description}</p>
    </div>
  </Link>
);


export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="w-full border-b border-gray-200 shadow-sm">
      <div className="mx-auto w-full px-[60px] py-[24px]">
        <div className="flex items-center justify-between h-[77px]">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Logo className="w-36 h-auto transition-transform duration-300 ease-out hover:scale-110 ml-14" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-10">
            <div className="relative group z-40">
              <div className="flex items-center space-x-1 text-[#0e2f3c] font-medium cursor-pointer">
                <span>Solutions</span>
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </div>

              {/* Solutions Dropdown - Full Width */}
              <div
                className="fixed left-0 right-0 bg-white shadow-lg border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                style={{ top: "77px" }}
              >
                <div className="mx-auto w-[1440px] px-[60px] py-6">
                  <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                    {solutionsNavItems.map((item) => (
                      // Add key prop directly here
                      <DropdownMenuItem key={item.href} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group z-40">
              <div className="flex items-center space-x-1 text-[#0e2f3c] font-medium cursor-pointer">
                <span>Resources</span>
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </div>

              {/* Resources Dropdown - Full Width */}
              <div
                className="fixed left-0 right-0 bg-white shadow-lg border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                style={{ top: "77px" }}
              >
                <div className="mx-auto w-[1440px] px-[60px] py-6">
                  <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                    {resourcesNavItems.map((item) => (
                      // Add key prop directly here
                      <DropdownMenuItem key={item.href} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group z-40">
              <div className="flex items-center space-x-1 text-[#0e2f3c] font-medium cursor-pointer">
                <span>Opportunity</span>
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </div>

              {/* Opportunity Dropdown - Full Width */}
              <div
                className="fixed left-0 right-0 bg-white shadow-lg border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                style={{ top: "77px" }}
              >
                <div className="mx-auto w-[1440px] px-[60px] py-6">
                  <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                    {opportunityNavItems.map((item) => (
                      // Add key prop directly here
                      <DropdownMenuItem key={item.href} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Right side - Language, App button, Sign In */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-[#0e2f3c] font-medium cursor-pointer">
              <span>EN</span>
              <ChevronDown size={16} />
            </div>
            <Link
              href="#"
              className="px-6 py-2 bg-[#0e2f3c] text-white rounded-md font-medium  hover:text-slate-800 hover:bg-amber-500 transition-colors"
            >
              Get the App
            </Link>

            {/* Conditional rendering based on authentication state */}
            {isAuthenticated ? (
              <UserProfileButton />
            ) : (
              <Link href="/auth/signin" className="flex items-center space-x-2">
                <span className="text-[#0e2f3c] font-medium">Sign In</span>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      fill="#BDBDBD"
                    />
                    <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#BDBDBD" />
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
