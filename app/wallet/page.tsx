import Header from "@/components/header";
import Footer from "@/components/footer";
import WorkInProgress from "@/components/work-in-progress";
import {
  Wallet,
  CreditCard,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Wallet</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Manage your payments, transactions, and travel credits in one place.
          </p>
        </section>

        {/* Wallet Preview Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#ffffde] flex items-center justify-center mr-4">
                <Wallet className="text-[#e09f3e]" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#0e2f3c]">Your Wallet</h2>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-[#0e2f3c] to-[#1a4a5c] rounded-lg p-6 text-white">
                <p className="text-sm opacity-80 mb-2">Available Balance</p>
                <p className="text-3xl font-bold mb-4">₦0.00</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CreditCard size={16} className="mr-1" />
                    <span className="text-xs">**** 4321</span>
                  </div>
                  <span className="text-xs opacity-80">Coming Soon</span>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium text-[#0e2f3c]">Recent Activity</p>
                  <Receipt size={16} className="text-[#4f4f4f]" />
                </div>
                <div className="flex flex-col items-center justify-center h-24 text-center text-[#4f4f4f] text-sm">
                  <p>No recent transactions</p>
                  <p>Your activity will appear here</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium text-[#0e2f3c]">Quick Actions</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center p-2 rounded-md border border-gray-100 bg-gray-50 text-[#4f4f4f]">
                    <ArrowUpRight size={16} className="mr-2 text-[#e09f3e]" />
                    <span className="text-sm">Add Funds</span>
                  </div>
                  <div className="flex items-center p-2 rounded-md border border-gray-100 bg-gray-50 text-[#4f4f4f]">
                    <ArrowDownRight size={16} className="mr-2 text-[#e09f3e]" />
                    <span className="text-sm">Withdraw</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Wallet & Payments"
          description="We're building a comprehensive wallet system where you can manage your payments, view transaction history, store payment methods, and access travel credits and rewards."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
