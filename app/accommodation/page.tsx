import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function AccommodationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Accommodation</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Find the perfect stay, from luxury hotels to hidden gems across Africa.
          </p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Accommodation"
          description="We're currently crafting an exceptional accommodation experience for you. Soon you'll be able to discover and book the perfect stays across Africa's most beautiful destinations."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
