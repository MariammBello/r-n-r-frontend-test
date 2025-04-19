"use client" // Needed if we add interactive elements later

import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, ChevronRight } from "lucide-react"
import Link from "next/link"

// TODO: Fetch accommodation details based on params.id
export default function AccommodationDetailPage({ params }: { params: { id: string } }) {
  // Placeholder name - replace with fetched data
  const accommodationName = "4 bedroom bungalow";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px]">
        {/* Breadcrumbs START */}
        {/* TODO: Adjust spacing based on final design */}
        <Breadcrumb className="py-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center text-[#828282] hover:text-[#0e2f3c]">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-[#828282]" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                 <Link href="/accommodation" className="text-[#828282] hover:text-[#0e2f3c]">
                   Accommodation
                 </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
             <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-[#828282]" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-extrabold text-[#0e2f3c] capitalize">
                {/* Use placeholder or fetched name */}
                {accommodationName.toLowerCase()}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Breadcrumbs END */}

        {/* TODO: Add Accommodation Details Content Here */}
        <div className="py-10">
          <h1 className="text-3xl font-bold mb-4 capitalize">{accommodationName} Details</h1>
          <p>Details for accommodation ID: {params.id} will go here.</p>
          {/* Add image gallery, description, booking form, etc. */}
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
