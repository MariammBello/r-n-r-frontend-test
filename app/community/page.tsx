import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Community</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Connect, share and engage with other travelers and culture enthusiasts.
          </p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Community"
          description="We're building a vibrant community platform where you can connect, share, and engage with other travelers and culture enthusiasts from around the world."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
