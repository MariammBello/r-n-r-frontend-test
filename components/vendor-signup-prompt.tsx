import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image'; // For social login icons

// Placeholder icons - replace with actual icons/components if available
const GoogleIcon = () => <Image src="/images/google-icon.svg" alt="Google" width={24} height={24} />; // Example path
const FacebookIcon = () => <Image src="/images/facebook-icon.svg" alt="Facebook" width={24} height={24} />; // Example path
const AppleIcon = () => <Image src="/images/apple-icon.svg" alt="Apple" width={24} height={24} />; // Example path


export default function VendorSignupPrompt() {
  return (
    <section className="bg-[#0e2f3c] text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/10 p-8 md:p-12 rounded-lg">

          {/* Left Side Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Going on a trip soon?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-md">
              Join millions of travelers to get the best value on unique accommodations, flights, authentic experiences and package deals; discounts & rewards for your next travel experience.
            </p>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-[#0e2f3c]">
              Plan with us
            </Button>
          </div>

          {/* Right Side Form */}
          <div className="md:w-1/2 lg:w-2/5 bg-white text-[#4f4f4f] p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-[#0e2f3c] mb-4 text-center">Sign in/Create account</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="email-signup" className="block text-sm font-medium mb-1">Enter your email address</label>
                <Input type="email" id="email-signup" placeholder="john@xyz.com" className="w-full" />
              </div>
              <Button type="submit" className="w-full bg-[#0e2f3c] text-white hover:bg-[#1f5a75]">
                Continue
              </Button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">Or sign in with</span>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" className="border-gray-300">
                <GoogleIcon />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-300">
                <FacebookIcon />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-300">
                <AppleIcon />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
