"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"

interface Review {
  author: string
  rating: number
  text: string
  date: string
  avatar: string
  photoUrl?: string
}

export function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews: Review[] = [
    {
      author: "Amanda Blandf...",
      rating: 5,
      text: "Great local print shop that my business has been using for a couple of years now. I highly recommend...",
      date: "Dec 23, 2022",
      avatar: "AB"
    },
    {
      author: "Rebecca Olene...",
      rating: 5,
      text: "Fantastic service! Locally owned and operated family business! Great prices and people! Highly recom...",
      date: "Jan 24, 2022",
      avatar: "RO"
    },
    {
      author: "Shannon McInt...",
      rating: 5,
      text: "Fantastic service! Locally owned and operated family business! Great prices and people! Highly recom...",
      date: "Dec 23, 2022",
      avatar: "SM"
    },
    {
      author: "jackie allen",
      rating: 5,
      text: "They were great to work with. Very nice and fast!",
      date: "Sep 9, 2022",
      avatar: "JA"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [reviews.length])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          {/* Business Info Card - Left Side */}
          <div className="flex-shrink-0 w-64">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <Image 
                  src="/images /LOGO.png" 
                  alt="Ragsdale Design Center" 
                  width={48}
                  height={48}
                  className="rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">Ragsdale Design Center LLC</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-medium text-gray-900">5.0</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">10 Google Reviews</p>
                </div>
              </div>
              <Image 
                src="/images /shop.jpg" 
                alt="Ragsdale Design Center" 
                width={240}
                height={160}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <a
                href="https://share.google/qIT79YMaSTftYfX9O"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View on Google
              </a>
            </div>
          </div>

          {/* Reviews Carousel - Right Side */}
          <div className="flex-1 relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-4" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="min-w-full">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <div className="flex items-start gap-3 mb-3">
                        <img 
                          src={review.photoUrl || `https://ui-avatars.com/api/?name=${review.avatar}&background=random&size=40&rounded=true`}
                          alt={review.author}
                          className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900 text-sm">{review.author}</h4>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                      <button className="text-blue-600 text-xs mt-2 hover:underline">Read More</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 z-10"
              aria-label="Previous review"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 z-10"
              aria-label="Next review"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
