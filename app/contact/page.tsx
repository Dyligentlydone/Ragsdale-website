import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us - Ragsdale Design",
  description: "Get in touch with Ragsdale Design for all your printing needs. Upload your files and tell us about your project.",
}

export default function ContactPage() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Work Together
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to bring your vision to life? Fill out the form below and upload your files. We'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Your Project</h2>
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">509 Wolverine St<br/>Rockford, MI 49341</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">(616) 884-5680</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">info@ragsdaledesign.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-600">Mon-Fri: 9am - 5pm</p>
                    <p className="text-gray-600">Sat-Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4">What to Include</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Project type and quantity needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Preferred size and materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Timeline and deadline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Design files or reference images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white mt-1">•</span>
                  <span>Any special requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">File Upload Tips</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p className="font-semibold">Accepted file types: PDF, JPG, JPEG, PNG, AI, and SVG.</p>
                <p><span className="font-semibold">Print-ready files:</span> Must be submitted in PDF format.</p>
                <p><span className="font-semibold">Logos and vector files:</span> Must be in AI or SVG format.</p>
                <p className="mt-3">For best results, upload high-resolution files (300 DPI minimum). Files up to 100MB each.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
