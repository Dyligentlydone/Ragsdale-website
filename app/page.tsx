import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CreditCard, FileText, Flag, Package, Palette, Printer } from "lucide-react";
import { GoogleReviews } from "@/components/google-reviews";
import { ShopMap } from "@/components/shop-map";

const services = [
  { icon: CreditCard, title: "Business Cards", href: "/services#business-cards", desc: "Premium stock, distinctive finishes, and impressions that last." },
  { icon: FileText, title: "Marketing Materials", href: "/services#marketing", desc: "Flyers, brochures, postcards, and mailers built to convert." },
  { icon: Flag, title: "Signage & Banners", href: "/services#signage", desc: "Large-format printing for indoor and outdoor visibility." },
  { icon: Package, title: "Promotional Items", href: "/services#promotional", desc: "Custom branded merch that keeps your name in rotation." },
  { icon: Palette, title: "Art Prints", href: "/services#art-prints", desc: "Gallery-grade reproduction on premium paper and canvas." },
  { icon: Printer, title: "Custom Projects", href: "/contact", desc: "Invitations, forms, bindery, and specialty runs — just ask." },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-black text-zinc-100">
      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(241,93,42,0.25) 0%, rgba(241,93,42,0) 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/images /Hori Logo.png"
                alt="Ragsdale Design Center"
                width={280}
                height={90}
                priority
                className="h-28 md:h-32 w-auto"
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1 text-[10px] sm:text-xs text-zinc-400 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="whitespace-nowrap">Rockford, MI · Print &amp; Design Center · Est. 2013</span>
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-white">
              Your Local{" "}
              <span className="text-primary">Print & Design</span>{" "}
              Center
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-400">
              Refined by hand. Locally rooted. Every product carefully perfected — because craftsmanship still matters.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full text-base font-medium hover:bg-primary/90 transition-colors"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center bg-transparent text-white px-7 py-3.5 rounded-full text-base font-medium border border-zinc-700 hover:border-primary hover:text-primary transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { t: "Refined By Hand", d: "Every product is carefully perfected by hand — because we believe craftsmanship matters." },
              { t: "Locally Rooted", d: "Made right here in Michigan, by people who care about the work and the people it's for." },
              { t: "Thoughtful Creation", d: "From file to finish, every customer gets the attention they deserve. Real hands, real care." },
            ].map((p) => (
              <div key={p.t} className="relative">
                <div className="h-px w-10 bg-primary mb-5" />
                <h3 className="text-xl font-semibold text-white mb-2">{p.t}</h3>
                <p className="text-zinc-400 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">What we do</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Our Services</h2>
            </div>
            <p className="text-zinc-400 max-w-md">
              Professional printing solutions for every business need — crafted with precision and personality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 rounded-2xl overflow-hidden">
            {services.map(({ icon: Icon, title, href, desc }) => (
              <Link
                key={title}
                href={href}
                className="group relative bg-black p-8 transition-colors hover:bg-zinc-950"
              >
                <Icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 mb-5 leading-relaxed">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* Social */}
      <section className="pt-2 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-8">
            Stay connected with us
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[
              {
                href: "https://www.facebook.com/RagsdaleDesignCenter/",
                label: "Facebook",
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
                  </svg>
                ),
              },
              {
                href: "https://www.instagram.com/ragsdaledesign",
                label: "Instagram",
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
              },
              {
                href: "https://www.pinterest.com/ragsdaledesigncenter/_created",
                label: "Pinterest",
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.355-.629-2.746-1.378l-.747 2.853c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.605.001 11.985.001l.032-.001Z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-5 py-2.5 text-sm text-zinc-300 hover:border-primary hover:text-primary transition-colors"
              >
                <span className="text-zinc-400 group-hover:text-primary transition-colors">{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-10 md:p-16 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[120%] opacity-40"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(241,93,42,0.45), transparent)",
              }}
            />
            <h2 className="relative text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              Ready to create?
            </h2>
            <p className="relative text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life. Contact us today to discuss your printing needs.
            </p>
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-base font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <ShopMap />
    </div>
  );
}
