import Link from "next/link"
import { Heart, Users, Award, Sparkles } from "lucide-react"

export const metadata = {
  title: "About Us - Ragsdale Design",
  description: "Learn about Ragsdale Design, your local print shop in Michigan. Refined by hand, locally rooted, thoughtfully created.",
}

export default function AboutPage() {
  return (
    <div className="py-24 bg-black text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            About Ragsdale Design Center
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A locally rooted print and design center based in Rockford, Michigan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src="/images /newspaper.png" 
              alt="Ragsdale Design Center Shop" 
              className="w-3/4 h-auto object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">Our Story</h2>
            <p className="text-lg text-zinc-400 mb-4">
              Ragsdale Design Center is a locally rooted print and design center based in Rockford Michigan. What began as a small creative shop has grown into a trusted resource for businesses, artists, and organizations throughout West Michigan.
            </p>
            <p className="text-lg text-zinc-400 mb-4">
              We take pride in doing things the right way—combining modern technology with hands-on craftsmanship to produce work that reflects care, precision, and pride in our community. Every piece that leaves our shop has been handled with intention, because we believe great print still matters.
            </p>
            <p className="text-lg text-zinc-400 mb-4">
              Our team isn't just here to run jobs; we're here to guide, support, and collaborate. Whether helping a business make its first impression or bringing an artist's vision to life, we approach every project with a sense of responsibility to get it right.
            </p>
            <p className="text-lg text-zinc-400">
              Being part of this community is at the heart of everything we do. We know the people we print for—neighbors, entrepreneurs, educators, and makers—and that connection drives our commitment to quality and trust. Over the years, we've built more than a print shop; we've built a reputation as a dependable partner in the creative and professional landscape of Rockford.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { Icon: Heart, t: "Refined By Hand", d: "Every product is carefully perfected by hand because we believe craftsmanship matters." },
            { Icon: Users, t: "Locally Rooted", d: "Based in Rockford, Michigan. We know the people we print for—neighbors, entrepreneurs, and makers." },
            { Icon: Sparkles, t: "Thoughtful Creation", d: "From file to finish, every customer gets the attention they deserve." },
            { Icon: Award, t: "Quality First", d: "We never compromise on quality. Your satisfaction is our top priority." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-5 border border-primary/20">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-zinc-900 bg-zinc-950/50 p-10 md:p-14">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-white mb-2">Local Expertise</h3>
                <p className="text-zinc-400">
                  We understand the needs of West Michigan businesses and provide personalized service you won't find with online print shops.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Fast Turnaround</h3>
                <p className="text-zinc-400">
                  Need it quickly? We offer rush services and same-day printing on select products.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Design Support</h3>
                <p className="text-zinc-400">
                  Not a designer? No problem. We can help refine your ideas and create professional-looking materials.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Quality Guarantee</h3>
                <p className="text-zinc-400">
                  We stand behind our work. If you're not satisfied, we'll make it right.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Let's bring your vision to life. Contact us today to discuss your printing needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-base font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
