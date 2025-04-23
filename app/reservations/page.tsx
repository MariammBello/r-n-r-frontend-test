// pages/reservations.tsx
"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Home, FileText, MessageCircle } from 'lucide-react';
import Header from '@/components/header';
import Footer from "@/components/footer"
import ProfilePage from '../profile/page';
type TabType = 'Bookings' | 'Reservations' | 'Wishlist';

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('Bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewStyle, setViewStyle] = useState<'normal' | 'dotted'>('normal');

  // Toggle between normal and dotted view styles
  const toggleViewStyle = () => {
    setViewStyle(viewStyle === 'normal' ? 'dotted' : 'normal');
  };

  return (
    
    <div className={`min-h-screen bg-white ${viewStyle === 'dotted' ? 'dotted-background' : ''}`}>
         <div className='mb-12'>
                                <Header />
                         
                                </div>
                                <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
  {/* Profile Section */}
  <div>

  </div>
  {/* <div className="flex gap-6 px-4 py-6">

  <aside className="w-1/4 bg-gray-100 rounded-lg p-4 shadow">
    <ProfilePage />
  </aside>
  </div> */}
  </div>
            
      <Head>

        <title>Reservations & Trips</title>
        <meta name="description" content="Manage your reservations and trips" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Breadcrumb Navigation */}
      <div className={`py-3 px-4 flex items-center border-b ${viewStyle === 'dotted' ? 'border-blue-100' : 'border-gray-100'}`}>
        <Link href="/" className="text-gray-500 hover:text-gray-700">

          <Home size={18} />

        </Link>
        <span className="text-sm text-gray-500 hover:text-black cursor-pointer">Home</span>

        <span className="mx-2 text-gray-400"> &gt; </span>
        <Link href="/profile" className="text-gray-500 hover:text-black">
          <span className="text-sm">Profile</span>
        </Link>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-sm font-medium">Reservations & Trips</span>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Reservations & Trips</h1>

        {/* Search Bar */}
        <div className="flex mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search"
              className={`w-full py-2 px-4 border ${viewStyle === 'dotted' ? 'border-blue-200' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-r-md">
            Search
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex">
            {(['Bookings', 'Reservations', 'Wishlist'] as TabType[]).map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === tab 
                    ? 'text-black border-b-2  border-amber-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="bg-amber-100 p-6 rounded-md mb-4">
            <FileText className="w-12 h-12 text-amber-500 mx-auto" />
          </div>
          <p className="text-gray-800 font-medium">No bookings yet!</p>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-800">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

    

      <style jsx global>{`
        .dotted-background {
          background-image: radial-gradient(#e2f0fb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
       <div className='mt-12'>
                          <Footer />
                   
                          </div>
    </div>
  );
}