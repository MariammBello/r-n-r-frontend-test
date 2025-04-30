import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Help Center</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">Find support and guidance for your travel experience.</p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Help Center"
          description="We're building a comprehensive help center to provide you with support and guidance for all aspects of your travel experience with Roots n Routes."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
