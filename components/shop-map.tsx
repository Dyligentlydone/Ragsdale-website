"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

const ShopMapInner = dynamic(() => import("./shop-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-zinc-950 flex items-center justify-center">
      <div className="text-zinc-600 text-sm">Loading map…</div>
    </div>
  ),
})

export function ShopMap() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Visit the shop</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Find us in Rockford
            </h2>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950">
          <div className="h-[420px] md:h-[520px] w-full">
            <ShopMapInner />
          </div>

          {/* Floating info card */}
          <div className="pointer-events-none absolute inset-0 p-4 md:p-6 flex items-end md:items-start md:justify-end z-[1000]">
            <div className="pointer-events-auto w-full md:w-80 rounded-2xl border border-zinc-800 bg-black/80 backdrop-blur-xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-primary/15 border border-primary/30 text-primary inline-flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-semibold">Ragsdale Design Center</h3>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    509 Wolverine St<br />
                    Rockford, MI 49341
                  </p>
                  <p className="text-sm text-zinc-400 mt-2">
                    Mon–Fri · 9am – 5pm
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href="https://www.google.com/maps/dir/?api=1&destination=509+Wolverine+St+Rockford+MI+49341"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-full text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  Get Directions
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <a
                  href="tel:+16168845680"
                  className="inline-flex items-center gap-1.5 border border-zinc-800 text-zinc-300 px-3.5 py-2 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
