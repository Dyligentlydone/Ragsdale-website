import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ragsdale Design Center - Rockford, MI Print & Design Studio",
  description: "A locally rooted print and design studio in Rockford, Michigan. Combining modern technology with hands-on craftsmanship. Business cards, marketing materials, signage, and more.",
  icons: {
    icon: "/images /LOGO.png",
    shortcut: "/images /LOGO.png",
    apple: "/images /LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Navigation />
        <main className="flex-1 pt-24 md:pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
