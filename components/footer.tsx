import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="w-[1440px] mx-auto px-[60px] relative">
        {/* Background "N" watermark - positioned absolutely */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <svg
            width="600"
            height="400"
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-20 -left-20"
          >
            <path d="M400 50L200 350H100V50H200V250L350 50H400Z" fill="#000000" />
          </svg>
        </div>

        {/* Footer links grid */}
        <div className="grid grid-cols-4 gap-8 mb-16 relative z-10">
          {/* Company column */}
          <div>
            <h3 className="text-[#0e2f3c] text-xl font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/newsroom" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors column */}
          <div>
            <h3 className="text-[#0e2f3c] text-xl font-bold mb-6">For Vendors</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/vendors/become" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link href="/vendors/tickets" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Sell Your Tickets
                </Link>
              </li>
              <li>
                <Link href="/vendors/advertising" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Advertising
                </Link>
              </li>
              <li>
                <Link href="/vendors/affiliate" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Affiliate Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-[#0e2f3c] text-xl font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/help" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Refunds & Disputes
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional links column */}
          <div className="pt-10">
            <ul className="space-y-4">
              <li>
                <Link href="/anti-discrimination" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Anti Discrimination
                </Link>
              </li>
              <li>
                <Link href="/disability-support" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Disability Support
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-[#4f4f4f] hover:text-[#0e2f3c] transition-colors">
                  Member Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social media and copyright */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              className="w-8 h-8 rounded-full bg-[#0e2f3c] flex items-center justify-center text-white"
            >
              <Facebook size={16} />
            </Link>
            <Link
              href="https://instagram.com"
              className="w-8 h-8 rounded-full bg-[#0e2f3c] flex items-center justify-center text-white"
            >
              <Instagram size={16} />
            </Link>
            <Link
              href="https://twitter.com"
              className="w-8 h-8 rounded-full bg-[#0e2f3c] flex items-center justify-center text-white"
            >
              <Twitter size={16} />
            </Link>
            <Link
              href="https://linkedin.com"
              className="w-8 h-8 rounded-full bg-[#0e2f3c] flex items-center justify-center text-white"
            >
              <Linkedin size={16} />
            </Link>
          </div>
          <div className="text-[#4f4f4f] text-sm">© 2025 Routes 'n' Routes. All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}
