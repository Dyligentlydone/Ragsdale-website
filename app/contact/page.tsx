import { ContactForm } from "@/components/contact-form"
import { Phone, MapPin, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us - Ragsdale Design",
  description: "Get in touch with Ragsdale Design for all your printing needs. Upload your files and tell us about your project.",
}

export default function ContactPage() {
  return (
    <div className="py-24 bg-black text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Ready to bring your vision to life? Fill out the form below and upload your files. We'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/50 p-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-6">Start Your Project</h2>
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-zinc-400">509 Wolverine St<br/>Rockford, MI 49341</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-zinc-400">(616) 884-5680</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-white">Business Hours</p>
                    <p className="text-zinc-400">Mon-Fri: 9am - 5pm</p>
                    <p className="text-zinc-400">Sat-Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-6">
              <h3 className="text-xl font-semibold text-white mb-4">What to Include</h3>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Project type and quantity needed</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Preferred size and materials</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Timeline and deadline</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Design files or reference images</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span><span>Any special requirements</span></li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">File Upload Tips</h3>
              <div className="text-sm text-zinc-400 space-y-2">
                <p className="font-semibold text-zinc-300">Accepted: PDF, JPG, JPEG, PNG, AI, and SVG.</p>
                <p><span className="font-semibold text-zinc-300">Print-ready files:</span> Must be submitted in PDF format.</p>
                <p><span className="font-semibold text-zinc-300">Logos and vector files:</span> Must be in AI or SVG format.</p>
                <p className="mt-3">For best results, upload high-resolution files (300 DPI minimum). Files up to 100MB each.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mt-12">
          <div className="rounded-2xl border border-zinc-900 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.8786842!2d-85.5598!3d43.1203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x881898c8e8e8e8e8%3A0x1234567890!2s509%20Wolverine%20St%2C%20Rockford%2C%20MI%2049341!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ragsdale Design Center Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
