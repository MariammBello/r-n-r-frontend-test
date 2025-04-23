<<<<<<< HEAD
import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"
import Image from "next/image"
import { User, Settings, CreditCard, Heart, Ticket } from "lucide-react"
=======

"use client";
import { useState } from "react";
import Header from "@/components/header"
import Footer from "@/components/footer"
import { FaCheckCircle, FaEdit, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
>>>>>>> 8d983bf (updated profile management section)

export default function ProfilePage() {
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">My Profile</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Manage your personal information, bookings, and preferences.
          </p>
        </section>

        {/* Profile Preview Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mr-6">
                <Image src="/placeholder.svg?height=96&width=96" alt="Profile picture" fill className="object-cover" />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold text-[#0e2f3c]">Sarah Phillips</h2>
                  <div className="ml-2 px-2 py-1 bg-[#e09f3e] text-[#0e2f3c] text-xs rounded-full font-medium">
                    Certified Wanderer
                  </div>
                </div>
                <p className="text-[#4f4f4f]">sarah.phillips@example.com</p>
                <p className="text-[#4f4f4f] text-sm">Member since January 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mb-12">
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#ffffde] flex items-center justify-center mb-2">
                <User className="text-[#e09f3e]" size={24} />
              </div>
              <p className="text-[#0e2f3c] font-medium">Account</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#ffffde] flex items-center justify-center mb-2">
                <Ticket className="text-[#e09f3e]" size={24} />
              </div>
              <p className="text-[#0e2f3c] font-medium">Bookings</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#ffffde] flex items-center justify-center mb-2">
                <Heart className="text-[#e09f3e]" size={24} />
              </div>
              <p className="text-[#0e2f3c] font-medium">Wishlist</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#ffffde] flex items-center justify-center mb-2">
                <CreditCard className="text-[#e09f3e]" size={24} />
              </div>
              <p className="text-[#0e2f3c] font-medium">Payments</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#ffffde] flex items-center justify-center mb-2">
                <Settings className="text-[#e09f3e]" size={24} />
              </div>
              <p className="text-[#0e2f3c] font-medium">Settings</p>
            </div>
          </div>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Profile Dashboard"
          description="We're building a comprehensive profile dashboard where you can manage your personal information, view your booking history, access your wishlist, and customize your travel preferences."
        />
      </main>

      {/* Footer */}
      <Footer />
=======
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* Toggle Button for Sidebar */}
      <div className='mb-12'>
              <Header />
       
              </div>
      <button
        className="md:hidden p-4 bg-white shadow flex items-center"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block fixed md:static top-0 left-0 z-50 bg-white w-3/4 md:w-1/4 h-full border-r p-6 shadow-md`}
      >
        {/* Close Button on Mobile */}
        <div className="flex justify-end md:hidden mb-4">
          <button onClick={() => setIsSidebarOpen(false)}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center md:items-start w-full">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <h2 className="mt-3 text-lg font-bold text-center md:text-left">
            Sarah Philips <FaCheckCircle className="inline text-green-500" />
          </h2>
          <p className="text-sm text-gray-500 text-center md:text-left">
            sarah@xyz.com
          </p>
          <p className="text-xs text-gray-400 text-center md:text-left">
            Certified Wanderer
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 w-full">
          <nav>
            <ul className="flex flex-col space-y-2">
              <li>
              <Link
                  href="/personal-information"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
Personal Information                </Link>
              </li>
              <li>
                <Link
                  href="personal-info"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link
                  href="/reservations"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Reservations & Trips
                </Link>
              </li>
              <li>
                <Link
                  href="referral"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Referrals & Rewards
                </Link>
              </li>
              <li>
                <Link
                  href="security"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Security & Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/settings-preferences"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Settings & Preferences
                </Link>
              </li>
              <li>
                <Link
                  href="/help-feedback"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Help & Feedback
                </Link>
              </li>
              <li>
                
              <Link
                  href="/log-out"
                  className="block text-red-500 hover:textblack items-center ml-4"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Log Out
                </Link>

              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="w-full md:w-3/4 p-4 md:p-8 ml-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              
            
           
          </div>

          
        </div>
      </main>
       <div className='mt-12'>
                  <Footer />
           
                  </div>
>>>>>>> 8d983bf (updated profile management section)
    </div>
  )
}
