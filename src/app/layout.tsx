import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import FloatingBackground from "@/components/FloatingBackground";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WordPress Developer Portfolio | Elevating WordPress Beyond Limits",
  description:
    "Senior WordPress Developer specialized in Headless WP, Custom Plugin Development, and High-Performance Architectures. Building premium, scalable WordPress solutions.",
  keywords: [
    "WordPress Developer",
    "Headless WordPress",
    "Custom Plugin Development",
    "High-Performance WordPress",
    "WP Developer Portfolio",
  ],
  authors: [{ name: "WordPress Developer" }],
  openGraph: {
    title: "WordPress Developer Portfolio",
    description: "Elevating WordPress Beyond Limits",
    type: "website",
  },
};

import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-space-black text-star-white`}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <Header />
          <FloatingBackground />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
