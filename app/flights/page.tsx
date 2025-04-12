import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function FlightsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Flights</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Book hassle-free flights to top destinations across Africa.
          </p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Flights"
          description="We're currently building our flight booking platform. Soon you'll be able to book hassle-free flights to top destinations across Africa with just a few clicks."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
