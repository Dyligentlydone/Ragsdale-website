import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

const blogPosts: Record<string, any> = {
  "choosing-right-business-card-stock": {
    title: "Choosing the Right Business Card Stock: A Complete Guide for 2025",
    date: "January 15, 2025",
    readTime: "5 min read",
    category: "Business Cards",
    image: "/images /biz cards .png",
    content: `<p>Your business card is more than just contact information—it's a tangible representation of your brand. The cardstock you choose can make the difference between a card that gets kept and one that gets tossed.</p><h2>Understanding Cardstock Weight</h2><p>Cardstock weight is measured in points (pt) or pounds (lb):</p><ul><li><strong>14pt (350gsm):</strong> Standard weight, economical and professional</li><li><strong>16pt (400gsm):</strong> Premium weight, feels substantial and high-quality</li><li><strong>18pt+ (450gsm+):</strong> Ultra-thick, luxury feel</li></ul><h2>Popular Finishes</h2><p><strong>Matte:</strong> Sophisticated and easy to write on. Perfect for professional services.</p><p><strong>Gloss:</strong> Vibrant colors and eye-catching shine. Ideal for creative industries.</p><p><strong>Soft-Touch:</strong> Luxurious tactile experience. Great for high-end brands.</p><p>Contact Ragsdale Design Center to discuss your business card project and find the perfect match for your brand.</p>`
  },
  "print-ready-files-designers-guide": {
    title: "How to Prepare Print-Ready Files: A Designer's Guide to Perfect Results",
    date: "January 10, 2025",
    readTime: "7 min read",
    category: "Design Tips",
    image: "/images /marketing materials .png",
    content: `<p>Nothing is more frustrating than receiving printed materials that don't match your expectations. The key to perfect print results? Properly prepared, print-ready files.</p><h2>File Format Requirements</h2><p><strong>PDF is King:</strong> Always submit final files as high-resolution PDFs. Use PDF/X-1a or PDF/X-4 standards.</p><h2>Resolution and Image Quality</h2><p>For professional printing, images must be at least <strong>300 DPI</strong> at the final print size.</p><h2>Color Mode: CMYK vs RGB</h2><p><strong>Critical:</strong> All files must be in CMYK color mode for printing. RGB colors will shift when converted.</p><h2>Bleed and Safe Zones</h2><p><strong>Bleed:</strong> Extend backgrounds 0.125" beyond trim line.</p><p><strong>Safe Zone:</strong> Keep important text 0.125" inside trim line.</p>`
  },
  "large-format-printing-marketing": {
    title: "5 Ways Large Format Printing Can Transform Your Marketing Strategy",
    date: "January 5, 2025",
    readTime: "6 min read",
    category: "Marketing",
    image: "/images /signbanners.webp",
    content: `<p>In a digital world, large format printing offers a powerful way to capture attention and make a lasting physical impression.</p><h2>1. Trade Show Dominance</h2><p>Stand out with eye-catching banners, backdrops, and pop-up displays.</p><h2>2. Window Graphics That Stop Traffic</h2><p>Transform your storefront windows into powerful marketing tools.</p><h2>3. Event Marketing with Yard Signs</h2><p>Drive foot traffic with strategically placed signage.</p><h2>4. Interior Branding with Wall Graphics</h2><p>Create an immersive brand experience inside your business.</p><h2>5. Vehicle Wraps for Mobile Advertising</h2><p>Turn your company vehicles into moving billboards providing 24/7 brand visibility.</p>`
  },
  "color-psychology-print-design": {
    title: "The Psychology of Color in Print Design: What Your Brand Colors Really Say",
    date: "December 28, 2024",
    readTime: "8 min read",
    category: "Branding",
    image: "/images /art prints .png",
    content: `<p>Color is one of the most powerful tools in design, capable of evoking emotions and influencing decisions.</p><h2>Red: Energy, Passion, Urgency</h2><p>Perfect for sale announcements and food brands.</p><h2>Blue: Trust, Stability, Professionalism</h2><p>Ideal for financial services, healthcare, and technology.</p><h2>Green: Growth, Health, Sustainability</h2><p>Perfect for eco-friendly and health brands.</p><h2>Orange: Creativity, Enthusiasm</h2><p>Great for creative industries and youth-oriented brands.</p><p>Need help choosing the perfect colors? Our design team can help you create a color strategy that resonates with your audience.</p>`
  },
  "sustainable-printing-eco-friendly-options": {
    title: "Sustainable Printing: Eco-Friendly Options for Environmentally Conscious Businesses",
    date: "December 20, 2024",
    readTime: "6 min read",
    category: "Sustainability",
    image: "/images /menu.png",
    content: `<p>As businesses increasingly prioritize sustainability, eco-friendly printing options have become more accessible and affordable.</p><h2>Recycled and Sustainable Paper Options</h2><p>Paper made from recycled content reduces waste and saves trees. Look for FSC certified options.</p><h2>Eco-Friendly Inks</h2><p><strong>Soy-Based Inks:</strong> Made from renewable soybeans with lower VOC emissions and brighter colors.</p><p><strong>Vegetable-Based Inks:</strong> Similar benefits with even lower environmental impact.</p><h2>Sustainable Printing Practices</h2><p>Print-on-demand reduces waste by printing only what you need.</p><p>Contact Ragsdale Design Center to discuss eco-friendly options for your next project.</p>`
  },
  "trade-show-success-starts-with-strong-print": {
    title: "Trade Show Success Starts with Strong Print",
    date: "April 9, 2025",
    readTime: "6 min read",
    category: "Trade Shows",
    content: `<h2>Why Trade Shows Still Deliver Strong ROI</h2><p>Despite the rise of digital marketing, trade shows remain one of the highest-impact ways to generate qualified leads, build brand authority, and increase visibility.</p><h2>Your Booth Is a First Impression</h2><p>In a busy expo hall, attendees make split-second decisions. Clear messaging and strong visual branding are critical.</p><h2>Essential Trade Show Marketing Materials</h2><p><strong>Business Cards:</strong> Thick cardstock and clean design reinforce professionalism.</p><p><strong>Brochures & Flyers:</strong> Share services and product highlights.</p><p><strong>Signage & Banners:</strong> Create cohesion with retractable banners and backdrop graphics.</p>`
  },
  "trade-show-materials-should-work-as-hard-as-you-do": {
    title: "Trade Show Materials Should Work as Hard as You Do!",
    date: "April 8, 2025",
    readTime: "4 min read",
    category: "Trade Shows",
    content: `<h2>Trade Show Materials That Work as Hard as You Do</h2><p>Trade shows are competitive environments where first impressions happen fast. The right materials—from retractable banner stands to branded table covers—play a critical role in attracting attention.</p><p>High-quality print, cohesive branding, and strategic design ensure your booth stands out. Well-designed signage guides visitors while professionally printed collateral gives them something tangible to remember you by.</p>`
  },
  "business-cards-still-matter-in-2026": {
    title: "Business Cards Still Matter in 2026!",
    date: "April 3, 2025",
    readTime: "5 min read",
    category: "Business Cards",
    content: `<h2>First Impressions Are Still Physical</h2><p>When you hand someone a business card, you're giving them something real—a physical reminder of your brand and a moment of personal interaction.</p><h2>Business Cards Excel at In-Person Networking</h2><p>At trade shows and networking events, business cards slow the interaction just enough to feel intentional and reinforce professionalism.</p><h2>Why Quality Matters More Than Ever</h2><p>Paper choice, finish, and color accuracy all influence how your brand is perceived. Thick cardstock and professional printing elevate your card from contact info to a mini branding piece.</p>`
  },
  "local-print-shops-are-the-way-to-go": {
    title: "Local Print Shops Are The Way To Go.",
    date: "March 27, 2025",
    readTime: "6 min read",
    category: "Local Business",
    content: `<h2>Personalized Service You Can Actually Talk To</h2><p>At a local print shop, you're not another order number. You get real guidance from professionals who care about your project's success.</p><h2>Faster Turnaround Times</h2><p>When deadlines are tight, local printers deliver faster. No waiting on shipping delays—your order is handled by a team right down the street.</p><h2>Quality You Can See and Feel</h2><p>Local print shops invest in higher-end equipment and materials. Every print order is checked by hand for alignment, color accuracy, and finish.</p><h2>Supporting Local Business</h2><p>Every dollar spent locally circulates within your community—helping create jobs and fuel the growth of nearby small businesses.</p>`
  },
  "the-power-of-holiday-themed-print-design": {
    title: "The Power of Holiday-Themed Print Design",
    date: "November 21, 2024",
    readTime: "7 min read",
    category: "Seasonal",
    content: `<h2>Why Holiday Print Design Still Matters</h2><p>The holiday season means opportunity. With the right print design, you can cut through digital noise and bring a tangible connection to your brand.</p><h2>Start Early & Build Momentum</h2><p>Design holiday-themed postcards, flyers, or in-store signage in October or early November.</p><h2>Choose Festive Print Materials</h2><p>Use luxury finishes like foil accents, embossing, and soft-touch stocks. Pick festive colors: rich reds, evergreen, and metallics.</p><h2>Integrate Print + Digital</h2><p>Include QR codes on your holiday print pieces to drive users to exclusive online promos.</p>`
  },
  "print-design-trends-to-watch-in-2025": {
    title: "Print Design Trends to Watch in 2025",
    date: "November 14, 2024",
    readTime: "6 min read",
    category: "Design Trends",
    content: `<h2>Bold Minimalism</h2><p>Sleek, clean layouts with fewer elements, stronger contrast, oversized typography and vibrant pops of color.</p><h2>New Naturalism & Earthy Textures</h2><p>Print is moving toward tactile and organic—think textures, natural materials, and muted color palettes rooted in nature.</p><h2>Glitch Art & Abstract Elements</h2><p>For brands willing to lean into something expressive, glitch art and abstract shapes are showing up in print design.</p><h2>Maximalism</h2><p>Bold layers, rich detail, and expressive elements are making a mark in print-on-demand products.</p>`
  },
  "the-importance-of-design-in-print-why-great-design-still-matters": {
    title: "The Importance of Design in Print: Why Great Design Still Matters",
    date: "November 7, 2024",
    readTime: "5 min read",
    category: "Design",
    content: `<h2>First Impressions Matter</h2><p>When someone receives your business card or picks up your brochure, the design instantly communicates your brand's personality and professionalism.</p><h2>Design Enhances Readability</h2><p>The right fonts, colors, and layouts help guide the reader's eye and make information easy to digest.</p><h2>Consistency Builds Brand Recognition</h2><p>When your printed materials share a consistent color palette, typography, and visual style, it strengthens your brand identity.</p><h2>Print Design Adds Tangible Value</h2><p>Unlike digital ads that disappear with a scroll, print materials create a physical connection with your audience.</p>`
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]
  
  if (!post) {
    return {
      title: "Post Not Found - Ragsdale Design Center",
    }
  }

  return {
    title: `${post.title} - Ragsdale Design Center Blog`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="py-20 bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-orange-50 text-primary rounded-full text-sm font-medium mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {post.image && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-strong:text-gray-900 prose-ul:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-700 mb-6">
              Our team at Ragsdale Design Center is here to help bring your printing and design projects to life with expert guidance and quality craftsmanship.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
