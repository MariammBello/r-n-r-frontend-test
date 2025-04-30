import Header from "@/components/header"
import Footer from "@/components/footer"
import WorkInProgress from "@/components/work-in-progress"

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full mx-auto px-[60px]">
        {/* Hero Section */}
        <section className="py-12">
          <h1 className="text-4xl font-bold text-[#0e2f3c] mb-4">Sell Your Event Tickets</h1>
          <p className="text-xl text-[#4f4f4f] max-w-3xl">List and manage tickets for your events effortlessly.</p>
        </section>

        {/* Work in Progress Section */}
        <WorkInProgress
          title="Event Ticket Platform"
          description="We're developing a seamless platform for you to list and manage tickets for your events effortlessly. Soon you'll be able to reach a wider audience for your African cultural events."
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
