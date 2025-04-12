import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"
import { MessageSquare } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Messages</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Connect with hosts, vendors, and other travelers in your network.
          </p>
        </section>

        {/* Messages Preview Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-[#ffffde] flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-[#e09f3e]" size={32} />
              </div>
              <h2 className="text-xl font-bold text-[#0e2f3c] mb-2">Your Messages</h2>
              <p className="text-[#4f4f4f] max-w-md mx-auto">
                Stay connected with hosts, vendors, and fellow travelers. Your conversations will appear here.
              </p>
            </div>
          </div>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Messaging Center"
          description="We're building a comprehensive messaging platform where you can communicate with hosts, vendors, and other travelers to enhance your travel experience."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
