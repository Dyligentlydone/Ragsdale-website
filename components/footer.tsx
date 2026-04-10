import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">RAGSDALE DESIGN CENTER</h3>
            <p className="text-gray-400 mb-4">
              A locally rooted print and design studio based in Rockford, Michigan. Combining modern technology with hands-on craftsmanship.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>509 Wolverine St, Rockford, MI 49341</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>(616) 884-5680</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@ragsdaledesign.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services#business-cards" className="hover:text-primary transition-colors">
                  Business Cards
                </Link>
              </li>
              <li>
                <Link href="/services#marketing" className="hover:text-primary transition-colors">
                  Marketing Materials
                </Link>
              </li>
              <li>
                <Link href="/services#signage" className="hover:text-primary transition-colors">
                  Signage & Banners
                </Link>
              </li>
              <li>
                <Link href="/services#promotional" className="hover:text-primary transition-colors">
                  Promotional Items
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-gray-400">
          <div className="flex justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Ragsdale Design Center. All rights reserved.</p>
            <p>
              By: <a href="https://www.dyligent.solutions/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-500 transition-colors">{"{"} Dyligent {"}"}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
