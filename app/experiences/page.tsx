import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Experiences</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Immerse yourself in Africa's culture, nature, and adventure.
          </p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Experiences"
          description="We're currently crafting exciting experiences for you to explore. Soon you'll be able to immerse yourself in Africa's rich culture, breathtaking nature, and unforgettable adventures."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
