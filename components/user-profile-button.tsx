"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, LogOut, User, MessageSquare, Wallet } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function UserProfileButton() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white rounded-full pl-1 pr-2 py-1 border border-gray-100 hover:border-gray-200 transition-colors"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={user.avatar || "/images/placeholder-user.jpg"} // Updated fallback path
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <span className="text-[#0e2f3c] font-medium text-sm">{user.name}</span>
            {user.verified && (
              <div className="ml-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          <span className="text-[#4f4f4f] text-xs">{user.role}</span>
        </div>
        <ChevronDown size={16} className={`text-[#0e2f3c] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={user.avatar || "/images/placeholder-user.jpg"} // Updated fallback path
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-bold text-[#0e2f3c]">{user.name}</h3>
                  {user.verified && (
                    <div className="ml-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-[#4f4f4f] text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-[#0e2f3c] hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} className="mr-3" />
              <span>Profile</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center px-4 py-2 text-[#0e2f3c] hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare size={16} className="mr-3" />
              <span>Messages</span>
            </Link>
            <Link
              href="/wallet"
              className="flex items-center px-4 py-2 text-[#0e2f3c] hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Wallet size={16} className="mr-3" />
              <span>Wallet</span>
            </Link>
          </div>

          <div className="border-t border-gray-100 py-2">
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors"
            >
              <LogOut size={16} className="mr-3" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
