
"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { CheckCircle, Home, Copy, MessageCircle, User } from 'lucide-react';
import Header from '@/components/header';
import Footer from "@/components/footer"
interface Referral {
  name: string;
  avatarColor: string;
}

const ReferralsAndRewards: React.FC = () => {
  const [referralCodeCopied, setReferralCodeCopied] = useState(false);
  const [couponCodeCopied, setCouponCodeCopied] = useState(false);
  const referralCode = "SGG143";
  const couponCode = "SGG143 S9GJH5KSD";
  const viewStyle = 'solid'; // or 'dotted', depending on your logic

  
  // Mock referrals data
  const referrals: Referral[] = [
    { name: "Tabitha", avatarColor: "bg-yellow-200" },
    { name: "James", avatarColor: "bg-red-200" }
  ];

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setReferralCodeCopied(true);
    setTimeout(() => setReferralCodeCopied(false), 2000);
  };

  const handleCopyCouponCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCouponCodeCopied(true);
    setTimeout(() => setCouponCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className='mb-12'>
                    <Header />
             
                    </div>
      <Head>
        <title>Referrals & Rewards</title>
        <meta name="description" content="View your referrals and rewards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation breadcrumb */}
      
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

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">
          Referrals & Rewards
        </h1>

        {/* Referral code section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="mb-2 font-medium">Referral code</div>
          <div className="flex">
          <input 
  type="number" 
  value={referralCode} 
  onChange={(e) => setReferralCode(e.target.value === '' ? '' : Number(e.target.value))}
/>

               
              className="border border-gray-300 rounded-l px-3 py-2 flex-grow"
            />
            <button 
              onClick={handleCopyReferralCode}
              className="bg-gray-800 text-white px-4 py-2 rounded-r flex items-center"
            >
              <Copy size={16} className="mr-1" />
              {referralCodeCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Referral rewards section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="mb-2 font-medium">Referral rewards</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referrals.map((referral, index) => (
              <div key={index} className="bg-yellow-50 p-4 rounded-md">
                <div className="flex items-center mb-3">
                  <div className={`${referral.avatarColor} p-2 rounded-full mr-3`}>
                    <User size={16} className="text-gray-700" />
                  </div>
                  <div className="font-medium">{referral.name} registered with your code</div>
                </div>
                <p className="text-sm text-gray-600">
                  You get 10% off your next order when they complete their first booking on Routes 'n' Routes
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Route rank section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="mb-2 font-medium">Route rank</div>
          <div className="flex items-center mb-3">
            <div className="text-yellow-500 font-medium mr-2">Certified Wanderer</div>
            <div className="bg-blue-500 p-1 rounded-full">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
          <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Route rank rewards section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="mb-2 font-medium">Route rank rewards</div>
          <div>
            <div>20% discount off flights</div>
            <div>10% discount off accommodation</div>
          </div>
        </div>

        {/* Coupons section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="mb-2 font-medium">Coupons</div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Use this code for a surprise discount at check out</p>
            <div className="flex">
              <input 
                type="text" 
                value={couponCode} 
                readOnly 
                className="border border-gray-300 rounded-l px-3 py-2 flex-grow"
              />
              <button 
                onClick={handleCopyCouponCode}
                className="bg-gray-800 text-white px-4 py-2 rounded-r flex items-center"
              >
                <Copy size={16} className="mr-1" />
                {couponCodeCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Chat bubble */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
          <MessageCircle size={24} />
        </button>
      </div>
      <div className='mt-12'>
                    <Footer />
             
                    </div>
    </div>
  );
};

export default ReferralsAndRewards;