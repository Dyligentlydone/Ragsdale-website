import Link from "next/link";
import { CreditCard, FileText, Flag, Package, Palette, Printer } from "lucide-react";
import { GoogleReviews } from "@/components/google-reviews";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative bg-orange-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Local Print & Design Center
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Refined by hand. Locally rooted. Every product carefully perfected because we believe craftsmanship matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-primary text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="bg-white text-gray-900 px-8 py-4 rounded-md text-lg font-medium border-2 border-primary hover:bg-orange-50 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Refined By Hand</h3>
              <p className="text-gray-600">
                Every product is carefully perfected by hand — because we believe craftsmanship matters.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Locally Rooted</h3>
              <p className="text-gray-600">
                Everything is made right here in Michigan, by people who care about the work and the people it's for.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thoughtful Creation</h3>
              <p className="text-gray-600">
                From file to finish, every customer gets the attention they deserve. Real hands, real care, real quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Professional printing solutions for all your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-transparent">
              <CreditCard className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Business Cards</h3>
              <p className="text-gray-600 mb-4">
                Make a lasting impression with premium business cards. Multiple finishes and materials available.
              </p>
              <Link href="/services#business-cards" className="text-primary font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-transparent">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Marketing Materials</h3>
              <p className="text-gray-600 mb-4">
                Flyers, brochures, postcards, and more. Get your message out with high-quality prints.
              </p>
              <Link href="/services#marketing" className="text-primary font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-transparent">
              <Flag className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Signage & Banners</h3>
              <p className="text-gray-600 mb-4">
                Wide-format printing for banners, yard signs, and indoor/outdoor signage of any size.
              </p>
              <Link href="/services#signage" className="text-primary font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-transparent">
              <Package className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Promotional Items</h3>
              <p className="text-gray-600 mb-4">
                Custom branded merchandise to promote your business and build brand recognition.
              </p>
              <Link href="/services#promotional" className="text-primary font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-transparent">
              <Palette className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Art Prints</h3>
              <p className="text-gray-600 mb-4">
                High-quality art reproduction and custom prints on premium paper and canvas.
              </p>
              <Link href="/services#art-prints" className="text-primary font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-transparent">
              <Printer className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Custom Projects</h3>
              <p className="text-gray-600 mb-4">
                Invitations, announcements, carbonless forms, bindery jobs, and specialty printing.
              </p>
              <Link href="/contact" className="text-primary font-medium hover:underline">
                Get in touch →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl text-gray-900 mb-8">
            Let's bring your vision to life. Contact us today to discuss your printing needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-orange-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
