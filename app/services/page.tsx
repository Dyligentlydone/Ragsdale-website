import Link from "next/link"
import Image from "next/image"
import { CreditCard, FileText, Flag, Package, Palette, Printer, CheckCircle, Mail } from "lucide-react"

export const metadata = {
  title: "Services - Ragsdale Design",
  description: "Professional printing services including business cards, marketing materials, signage, banners, and custom projects.",
}

export default function ServicesPage() {
  return (
    <div className="py-24 bg-black text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/images /LOGO.png"
              alt="Ragsdale Design Center"
              width={280}
              height={90}
              className="h-12 md:h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Professional printing solutions for all your business & personal needs, crafted with care and precision.
          </p>
        </div>

        <div className="space-y-16">
          <section id="business-cards" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <CreditCard className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary mb-4">Business Cards</h2>
                <p className="text-lg text-zinc-400 mb-6">
                  Make a lasting first impression with premium business cards that reflect your brand's quality and professionalism.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Standard, premium, and ultra-thick cardstock options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Matte, gloss, soft-touch, and uncoated finishes, and more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Specialty options: foil stamping, embossing, spot UV, and more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Custom shapes and sizes available</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                  Get Started
                </Link>
              </div>
              <div className="rounded-2xl h-64 md:h-96 flex items-center justify-center bg-zinc-950/60 border border-zinc-900">
                <img 
                  src="/images /biz cards .png" 
                  alt="Business Cards" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </section>

          <section id="marketing" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-2xl h-64 md:h-96 flex items-center justify-center bg-zinc-950/60 border border-zinc-900">
                <img 
                  src="/images /Marketing Materials USE.png" 
                  alt="Marketing Materials" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="order-1 lg:order-2">
                <FileText className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary mb-4">Marketing Materials</h2>
                <p className="text-lg text-zinc-400 mb-6">
                  Get your message out with high-quality marketing materials that capture attention and drive results.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Flyers, posters, and brochures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Postcards and EDDM mailers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Advertisements and promotional materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Letterhead and envelopes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Booklets, programs, and catalogs</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </section>

          <section id="signage" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Flag className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary mb-4">Large-Format Printing & Signage</h2>
                <p className="text-lg text-zinc-400 mb-6">
                  Professional large-format printing for indoor and outdoor signage that makes a big impact.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Trade show items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Engineering plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Large-format printing and vinyl banners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Posters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Yard signs and A-frame signs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Foam board and window graphics</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                  Get Started
                </Link>
              </div>
              <div className="rounded-2xl h-64 md:h-96 flex items-center justify-center bg-zinc-950/60 border border-zinc-900">
                <img 
                  src="/images /signbanners.webp" 
                  alt="Signage and Banners" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </section>

          <section id="promotional" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-2xl h-64 md:h-96 flex items-center justify-center bg-zinc-950/60 border border-zinc-900">
                <img 
                  src="/images /specialty items & more.png" 
                  alt="Specialty Items" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="order-1 lg:order-2">
                <Package className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary mb-4">Specialty Items & More</h2>
                <p className="text-lg text-zinc-400 mb-6">
                  Custom specialty items and promotional products that make your brand memorable.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Stickers, magnets, and calendars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Bookmarks, table tents, and notepads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Menus and carbonless forms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Wide variety of promotional items</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </section>

          <section id="invitations" className="scroll-mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Mail className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary mb-4">Invitations & Announcements</h2>
                <p className="text-lg text-zinc-400 mb-6">
                  Beautifully crafted invitations and announcements for weddings, parties, graduations, and special occasions.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Wedding and event invitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Graduation and birthday announcements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Holiday cards and seasonal greetings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">Custom designs and premium papers</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                  Get Started
                </Link>
              </div>
              <div className="rounded-2xl h-64 md:h-96 flex items-center justify-center bg-zinc-950/60 border border-zinc-900">
                <img 
                  src="/images /Invitations & Announcements use.png" 
                  alt="Invitations & Announcements" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </section>
        </div>

        <section className="relative mt-20 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-12 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[120%] opacity-40"
            style={{ background: "radial-gradient(closest-side, rgba(241,93,42,0.45), transparent)" }}
          />
          <Printer className="relative w-14 h-14 mx-auto mb-6 text-primary" />
          <h2 className="relative text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">And Much More</h2>
          <p className="relative text-lg text-zinc-400 mb-8 max-w-3xl mx-auto">
            We also offer logo design, lamination up to 11x17, small bindery services, layout, graphic design, editing, photo restoration, and specialty printing projects. If you can imagine it, we can print it.
          </p>
          <Link href="/contact" className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-base font-medium hover:bg-primary/90 transition-colors">
            Discuss Your Project
          </Link>
        </section>
      </div>
    </div>
  )
}
