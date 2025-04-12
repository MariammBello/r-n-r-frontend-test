import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"
import Image from "next/image"
import { User, Settings, CreditCard, Heart, Ticket } from "lucide-react"

export default function ProfilePage() {
  return (
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
    </div>
  )
}
