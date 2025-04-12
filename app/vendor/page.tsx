import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function VendorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Become a Vendor</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">Join as a trusted partner and list your services with us.</p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Vendor Portal"
          description="We're building a powerful vendor platform where you can join as a trusted partner and list your services with us. Soon you'll be able to reach travelers from around the world."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
