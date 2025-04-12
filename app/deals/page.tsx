import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Deals</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">
            Unlock exclusive discounts for flights, stays, and experiences.
          </p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Deals"
          description="We're currently curating exclusive deals just for you. Soon you'll be able to unlock special discounts for flights, stays, and experiences across Africa."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
