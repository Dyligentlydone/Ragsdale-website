import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Promotional Products - Ragsdale Design Center",
  description: "Browse our wide selection of promotional products including apparel, drinkware, bags, technology, writing instruments, and more. Custom branded items for your business.",
}

const categories = [
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

export default function PromotionalProductsPage() {
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
            Promotional Products
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Custom branded products to elevate your brand and leave a lasting impression.
          </p>
        </div>

        <section aria-label="Product Categories">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {categories.map((category) => {
              return (
                <article
                  key={category.title}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 hover:border-primary/50 hover:bg-zinc-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-center mb-4">
                      <div className="w-32 h-32 rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-white text-center mb-4">
                      {category.title}
                    </h2>
                    
                    <ul className="space-y-2 mb-6 flex-1">
                      {category.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <a
                            href={sub.url}
                            className="text-sm text-zinc-400 hover:text-primary transition-colors duration-200 block"
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    
                    <a
                      href={category.shopAllUrl}
                      className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/20"
                    >
                      Shop All
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-16 text-center">
          <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Need Help Finding the Perfect Product?
            </h2>
            <p className="text-zinc-400 mb-6">
              Our team is here to help you find the right promotional products for your brand, event, or campaign.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
