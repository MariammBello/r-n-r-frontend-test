
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Header from '@/components/header';
import Footer from "@/components/footer"
export default function SecurityPrivacy() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [showCountry, setShowCountry] = useState(true);
  const [allowCookies, setAllowCookies] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) return '';
    
    // Simple strength calculation
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'fair';
    return 'strong';
  };

  const passwordStrength = calculatePasswordStrength(newPassword);

  return (
    <div className="min-h-screen bg-gray-50">
        <div className='mb-12'>
                          <Header />
                   
                          </div>
      <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="flex items-center" >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <span className="mx-2"> &gt; </span>
          <Link href="/profile" className='hover:text-black'>Profile</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900 font-medium">Security & Privacy</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">Security & Privacy</h1>

        <div className="space-y-6">
          {/* Password Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-4">Current Password</h2>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Password must contain at least 8 characters with an uppercase character, a lowercase character, a number, and a special character.
            </p>

            <h2 className="text-sm font-medium text-gray-700 mb-4 mt-6">New Password</h2>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      passwordStrength === 'weak' ? 'w-1/3 bg-red-500' : 
                      passwordStrength === 'fair' ? 'w-2/3 bg-yellow-500' : 
                      'w-full bg-green-500'
                    }`}
                  ></div>
                </div>
                <p className="text-xs font-medium mt-1 capitalize">
                  {passwordStrength}
                </p>
              </div>
            )}

            <div className="mt-6">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h2 className="text-sm font-medium text-gray-700">Enable Two-factor authentication</h2>
            </div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={twoFactor} 
                  onChange={() => setTwoFactor(!twoFactor)}
                />
                <div className={`w-10 h-6 ${twoFactor ? 'bg-green-500' : 'bg-gray-300'} rounded-full shadow-inner transition-colors`}></div>
                <div className={`absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow transform transition-transform ${twoFactor ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </label>
          </div>

          {/* Authentication Methods */}
          <div className="flex space-x-4 pb-4">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="sms" 
                name="auth-method" 
                className="h-4 w-4 text-indigo-600 border-gray-300" 
              />
              <label htmlFor="sms" className="ml-2 text-sm text-gray-700">SMS</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="authenticator" 
                name="auth-method" 
                className="h-4 w-4 text-indigo-600 border-gray-300" 
              />
              <label htmlFor="authenticator" className="ml-2 text-sm text-gray-700">Authenticator</label>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Save
            </button>
          </div>

          {/* Privacy Settings */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between py-4">
              <div>
                <h2 className="text-sm font-medium text-gray-700">Show My Country</h2>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={showCountry} 
                    onChange={() => setShowCountry(!showCountry)}
                  />
                  <div className={`w-10 h-6 ${showCountry ? 'bg-green-500' : 'bg-gray-300'} rounded-full shadow-inner transition-colors`}></div>
                  <div className={`absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow transform transition-transform ${showCountry ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <h2 className="text-sm font-medium text-gray-700">Allow Cookies</h2>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={allowCookies} 
                    onChange={() => setAllowCookies(!allowCookies)}
                  />
                  <div className={`w-10 h-6 ${allowCookies ? 'bg-green-500' : 'bg-gray-300'} rounded-full shadow-inner transition-colors`}></div>
                  <div className={`absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow transform transition-transform ${allowCookies ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <h2 className="text-sm font-medium text-gray-700">Read Receipts</h2>
              </div>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={readReceipts} 
                    onChange={() => setReadReceipts(!readReceipts)}
                  />
                  <div className={`w-10 h-6 ${readReceipts ? 'bg-green-500' : 'bg-gray-300'} rounded-full shadow-inner transition-colors`}></div>
                  <div className={`absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow transform transition-transform ${readReceipts ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </div>
          </div>

          {/* Delete Account */}
          <div className="pt-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
            >
              Delete My Account
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Help Button */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        </div>
      </div>
        <div className='mt-12'>
                          <Footer />
                   
                          </div>
    </div>
  );
}