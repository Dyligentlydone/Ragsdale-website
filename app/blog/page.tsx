import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Print & Design Blog - Ragsdale Design Center",
  description: "Expert tips, trends, and insights on professional printing, graphic design, and branding from Ragsdale Design Center in Rockford, Michigan.",
}

const blogPosts = [
  {
    slug: "trade-show-success-starts-with-strong-print",
    title: "Trade Show Success Starts with Strong Print",
    excerpt: "Trade shows are one of the most powerful marketing opportunities. Learn how high-quality print materials can help you stand out, generate leads, and make lasting impressions in competitive expo environments.",
    date: "April 9, 2025",
    readTime: "6 min read",
    category: "Trade Shows"
  },
  {
    slug: "trade-show-materials-should-work-as-hard-as-you-do",
    title: "Trade Show Materials Should Work as Hard as You Do!",
    excerpt: "The right trade show materials play a critical role in attracting attention and communicating professionalism. Discover how strategic design and quality print turn foot traffic into meaningful connections.",
    date: "April 8, 2025",
    readTime: "4 min read",
    category: "Trade Shows"
  },
  {
    slug: "choosing-right-business-card-stock",
    title: "Choosing the Right Business Card Stock: A Complete Guide for 2025",
    excerpt: "Your business card is often the first physical impression you make. Learn how to choose the perfect cardstock weight, finish, and material to make your cards stand out and leave a lasting impact.",
    date: "January 15, 2025",
    readTime: "5 min read",
    category: "Business Cards",
    image: "/images /biz cards .png"
  },
  {
    slug: "business-cards-still-matter-in-2026",
    title: "Business Cards Still Matter in 2026!",
    excerpt: "In a digital world, business cards remain powerful networking tools. Discover why tangible marketing builds trust and how quality business cards outperform digital-only first impressions.",
    date: "April 3, 2025",
    readTime: "5 min read",
    category: "Business Cards"
  },
  {
    slug: "print-ready-files-designers-guide",
    title: "How to Prepare Print-Ready Files: A Designer's Guide to Perfect Results",
    excerpt: "Avoid costly reprints and delays by learning the essential requirements for print-ready files. From bleed and trim marks to color modes and resolution, we cover everything you need to know.",
    date: "January 10, 2025",
    readTime: "7 min read",
    category: "Design Tips",
    image: "/images /marketing materials .png"
  },
  {
    slug: "local-print-shops-are-the-way-to-go",
    title: "Local Print Shops Are The Way To Go.",
    excerpt: "Local print shops offer personalized service, faster turnaround, and superior quality that online mega-printers can't match. Discover why choosing local printing supports your community and delivers better results.",
    date: "March 27, 2025",
    readTime: "6 min read",
    category: "Local Business"
  },
  {
    slug: "large-format-printing-marketing",
    title: "5 Ways Large Format Printing Can Transform Your Marketing Strategy",
    excerpt: "Discover how banners, posters, and signage can amplify your brand visibility and drive customer engagement. Learn which large format solutions work best for different marketing goals.",
    date: "January 5, 2025",
    readTime: "6 min read",
    category: "Marketing",
    image: "/images /signbanners.webp"
  },
  {
    slug: "color-psychology-print-design",
    title: "The Psychology of Color in Print Design: What Your Brand Colors Really Say",
    excerpt: "Colors evoke emotions and influence decisions. Understand how to strategically use color in your print materials to connect with your audience and strengthen your brand identity.",
    date: "December 28, 2024",
    readTime: "8 min read",
    category: "Branding",
    image: "/images /art prints .png"
  },
  {
    slug: "sustainable-printing-eco-friendly-options",
    title: "Sustainable Printing: Eco-Friendly Options for Environmentally Conscious Businesses",
    excerpt: "Learn about recycled papers, soy-based inks, and sustainable printing practices that reduce environmental impact without compromising quality. Make your marketing materials as green as your values.",
    date: "December 20, 2024",
    readTime: "6 min read",
    category: "Sustainability",
    image: "/images /menu.png"
  },
  {
    slug: "the-power-of-holiday-themed-print-design",
    title: "The Power of Holiday-Themed Print Design",
    excerpt: "Make this holiday season count with strategic print design. Learn how festive materials, premium finishes, and integrated campaigns can boost brand recall and drive holiday sales.",
    date: "November 21, 2024",
    readTime: "7 min read",
    category: "Seasonal"
  },
  {
    slug: "print-design-trends-to-watch-in-2025",
    title: "Print Design Trends to Watch in 2025",
    excerpt: "Stay ahead with the latest print design trends including bold minimalism, new naturalism, glitch art, and maximalism. Learn how to apply these trends while maintaining brand consistency.",
    date: "November 14, 2024",
    readTime: "6 min read",
    category: "Design Trends"
  },
  {
    slug: "the-importance-of-design-in-print-why-great-design-still-matters",
    title: "The Importance of Design in Print: Why Great Design Still Matters",
    excerpt: "Great design enhances readability, builds brand recognition, and adds tangible value to your print materials. Discover why professional design is essential for effective print marketing.",
    date: "November 7, 2024",
    readTime: "5 min read",
    category: "Design"
  }
]

export default function BlogPage() {
  return (
    <div className="py-24 bg-black text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Blog</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Print & Design Insights
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Expert tips, industry trends, and practical advice to help you make the most of your print and design projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group bg-zinc-950/50 rounded-2xl border border-zinc-900 overflow-hidden hover:border-zinc-700 transition-colors">
              {post.image && (
                <div className="h-48 bg-zinc-900 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3">
                  <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-zinc-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-zinc-500">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-20 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-10 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[120%] opacity-40"
            style={{ background: "radial-gradient(closest-side, rgba(241,93,42,0.45), transparent)" }}
          />
          <h2 className="relative text-2xl md:text-3xl font-semibold tracking-tight text-white mb-4">Ready to Start Your Next Project?</h2>
          <p className="relative text-zinc-400 mb-8 max-w-2xl mx-auto">
            Whether you need business cards, marketing materials, or large format printing, our team is here to help bring your vision to life.
          </p>
          <Link 
            href="/contact"
            className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  )
}
