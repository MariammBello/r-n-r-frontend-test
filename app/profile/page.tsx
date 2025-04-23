"use client";
// Removed duplicate imports from lines 2-8

import { useState } from "react";
import { FaCheckCircle, FaEdit, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Header from "@/components/header"; // Re-added Header import
import Footer from "@/components/footer"; // Re-added Footer import

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    dob: "24 Dec 1992",
    nationality: "Nigerian",
    gender: "Female",
    phone: "+2348012345678",
    emergency: "+2348123456789",
    verification: "International Passport",
    idNumber: "",
  });

  // Added type annotation for 'e'
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Data:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Toggle Button for Sidebar */}
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
                  href="/personal-info"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Personal Information
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
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
                  href="/profile/referrals-rewards"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Referrals & Rewards
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/security-privacy"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Security & Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/settings-preferences"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Settings & Preferences
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/help-feedback"
                  className="block p-2 hover:bg-amber-500 hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Help & Feedback
                </Link>
              </li>
              <li>
                <button className="p-2 text-red-500 hover:text-black w-full text-left">
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Header - Moved outside main */}
      <div className='mb-12 md:w-3/4 ml-auto px-4 md:px-8 pt-4'> {/* Added padding to align with main */}
        <Header />
      </div>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-4 md:p-8 ml-auto">
        <h1 className="text-2xl font-semibold">Personal Information</h1>
        <div className="bg-white p-6 rounded shadow mt-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-lg font-bold">
                Sarah Philips <FaCheckCircle className="inline text-green-500" />
              </h2>
              <p className="text-sm text-gray-500">sarah@xyz.com</p>
              <p className="text-xs text-gray-400">Certified Wanderer</p>
            </div>
            <button
              className="bg-slate-800 text-white h-11 w-48 p-5 rounded flex items-center mt-4 md:mt-0 hover:bg-amber-500 hover:text-white"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit <FaEdit className="ml-2" />
            </button>
          </div>

          <button
            className="mt-6 bg-gray-300 p-2 rounded w-full hover:bg-amber-500 hover:text-white"
            disabled={!isEditing}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </main>

      {/* Footer - Placed after main, within the main container div */}
      <div className='mt-12 md:w-3/4 ml-auto px-4 md:px-8 pb-4'> {/* Added padding */}
        <Footer />
      </div>
    </div> // Added missing closing div for the main container
  );
}
