"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
]

export function Navigation() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      {/* Floating pill nav */}
      <nav
        aria-label="Primary"
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-w-[640px]"
      >
        <div className="flex items-center justify-between gap-1 rounded-full border border-zinc-800 bg-black/70 p-1 md:p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="flex items-center">
            {links.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                    active
                      ? "text-white bg-zinc-900"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1 w-1 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </div>

          <Link
            href="/contact"
            className={`inline-flex items-center gap-1 md:gap-1.5 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium transition-colors ${
              isActive("/contact")
                ? "bg-primary/90 text-white"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Start</span>
            <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
          </Link>
        </div>
      </nav>
    </>
  )
}
