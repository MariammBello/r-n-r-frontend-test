import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">The Roots Blog</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Explore insights, stories, heritage, and cultural journeys.
          </p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="The Roots Blog"
          description="We're crafting insightful articles, stories, and guides about African heritage and cultural journeys. Our blog will soon be your go-to resource for travel inspiration."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
