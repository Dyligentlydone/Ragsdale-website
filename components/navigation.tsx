"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, ChevronDown, Shirt, Coffee, ShoppingBag, Smartphone, Pen, MoreHorizontal } from "lucide-react"

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
]

const promoCategories = [
  {
    title: "Apparel",
    image: "/images /apperal.png",
    subcategories: [
      { name: "T-Shirts", url: "https://ragsdaledesign.espwebsites.com/products?q=t-shirts" },
      { name: "Polos", url: "https://ragsdaledesign.espwebsites.com/products?q=polos" },
      { name: "Sweatshirts", url: "https://ragsdaledesign.espwebsites.com/products?q=sweatshirts" },
      { name: "Jackets", url: "https://ragsdaledesign.espwebsites.com/products?q=jackets" },
      { name: "Hats & Headwear", url: "https://ragsdaledesign.espwebsites.com/products?q=hats" },
    ],
    shopAllUrl: "https://ragsdaledesign.espwebsites.com/products?q=apparel",
  },
  {
    title: "Drinkware",
    image: "/images /drinkware.png",
    subcategories: [
      { name: "Mugs", url: "https://ragsdaledesign.espwebsites.com/products?q=mugs" },
      { name: "Travel Mugs", url: "https://ragsdaledesign.espwebsites.com/products?q=travel-mugs" },
      { name: "Tumblers", url: "https://ragsdaledesign.espwebsites.com/products?q=tumblers" },
      { name: "Water Bottles", url: "https://ragsdaledesign.espwebsites.com/products?q=water-bottles" },
      { name: "Barware", url: "https://ragsdaledesign.espwebsites.com/products?q=barware" },
    ],
    shopAllUrl: "https://ragsdaledesign.espwebsites.com/products?q=drinkware",
  },
  {
    title: "Bags",
    image: "/images /bags.png",
    subcategories: [
      { name: "Backpacks", url: "https://ragsdaledesign.espwebsites.com/products?q=backpacks" },
      { name: "Tote Bags", url: "https://ragsdaledesign.espwebsites.com/products?q=tote-bags" },
      { name: "Coolers", url: "https://ragsdaledesign.espwebsites.com/products?q=coolers" },
      { name: "Drawstring Bags", url: "https://ragsdaledesign.espwebsites.com/products?q=drawstring-bags" },
      { name: "Shopping Bags", url: "https://ragsdaledesign.espwebsites.com/products?q=shopping-bags" },
    ],
    shopAllUrl: "https://ragsdaledesign.espwebsites.com/products?q=bags",
  },
  {
    title: "Technology",
    image: "/images /technology.png",
    subcategories: [
      { name: "Power Banks", url: "https://ragsdaledesign.espwebsites.com/products?q=power-banks" },
      { name: "USB Drives", url: "https://ragsdaledesign.espwebsites.com/products?q=usb-drives" },
      { name: "Bluetooth", url: "https://ragsdaledesign.espwebsites.com/products?q=bluetooth" },
      { name: "Headphones", url: "https://ragsdaledesign.espwebsites.com/products?q=headphones" },
      { name: "Speakers", url: "https://ragsdaledesign.espwebsites.com/products?q=speakers" },
    ],
    shopAllUrl: "https://ragsdaledesign.espwebsites.com/products?q=technology",
  },
  {
    title: "Writing",
    image: "/images /writing .png",
    subcategories: [
      { name: "Metal Pens", url: "https://ragsdaledesign.espwebsites.com/products?q=metal-pens" },
      { name: "Plastic Pens", url: "https://ragsdaledesign.espwebsites.com/products?q=plastic-pens" },
      { name: "Pencils", url: "https://ragsdaledesign.espwebsites.com/products?q=pencils" },
      { name: "Notebooks", url: "https://ragsdaledesign.espwebsites.com/products?q=notebooks" },
      { name: "Padfolios", url: "https://ragsdaledesign.espwebsites.com/products?q=padfolios" },
    ],
    shopAllUrl: "https://ragsdaledesign.espwebsites.com/products?q=writing",
  },
  {
    title: "More Options",
    image: "/images /more options.png",
    subcategories: [
      { name: "Accessories", url: "https://ragsdaledesign.espwebsites.com/products?q=accessories" },
      { name: "Awards & Recognition", url: "https://ragsdaledesign.espwebsites.com/products?q=awards" },
      { name: "Health & Wellness", url: "https://ragsdaledesign.espwebsites.com/products?q=health-wellness" },
      { name: "Sustainable", url: "https://ragsdaledesign.espwebsites.com/products?q=sustainable" },
      { name: "Trade Show", url: "https://ragsdaledesign.espwebsites.com/products?q=trade-show" },
    ],
    shopAllUrl: "https://ragsdaledesign.espwebsites.com/products",
  },
]

export function Navigation() {
  const pathname = usePathname()
  const [promoDropdownOpen, setPromoDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setPromoDropdownOpen(false)
      }
    }

    if (promoDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [promoDropdownOpen])

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
            
            {/* Promotional Products with dropdown */}
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={(e) => {
                  e.preventDefault()
                  setPromoDropdownOpen(!promoDropdownOpen)
                }}
                className={`relative px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors flex items-center gap-1 ${
                  pathname === "/promotional-products"
                    ? "text-white bg-zinc-900"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="hidden md:inline">Promotional Products</span>
                <span className="md:hidden">Promo Materials</span>
                <ChevronDown className="w-3 h-3" />
                {pathname === "/promotional-products" && (
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-1 w-1 rounded-full bg-primary" />
                )}
              </button>
              
              {/* Detailed dropdown menu */}
              {promoDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className="fixed top-[60px] md:top-[80px] left-1/2 -translate-x-1/2 w-[calc(100vw-1rem)] md:w-[900px] md:max-w-[calc(100vw-2rem)] rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur-xl overflow-y-auto max-h-[80vh] p-4 md:p-6 z-[100]"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {promoCategories.map((category) => {
                      return (
                        <div
                          key={category.title}
                          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 md:p-4 hover:border-primary/50 hover:bg-zinc-800/50 transition-all duration-300"
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex justify-center mb-2 md:mb-3">
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center">
                                <img
                                  src={category.image}
                                  alt={category.title}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                            
                            <h3 className="text-sm md:text-base font-semibold text-white text-center mb-2 md:mb-3">
                              {category.title}
                            </h3>
                            
                            <ul className="space-y-1 md:space-y-1.5 mb-3 md:mb-4 flex-1">
                              {category.subcategories.map((sub) => (
                                <li key={sub.name}>
                                  <a
                                    href={sub.url}
                                    className="text-[10px] md:text-xs text-zinc-400 hover:text-primary transition-colors block"
                                  >
                                    {sub.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                            
                            <a
                              href={category.shopAllUrl}
                              className="inline-flex items-center justify-center gap-1 w-full bg-primary text-white px-2 md:px-3 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-medium hover:bg-primary/90 transition-colors"
                            >
                              Shop All
                              <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
                            </a>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
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
