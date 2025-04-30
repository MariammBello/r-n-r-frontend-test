import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">FAQs</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">Quick answers to common questions about Roots and Routes.</p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="FAQs"
          description="We're compiling a comprehensive list of frequently asked questions to help you quickly find answers about Roots n Routes services, booking process, and more."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
