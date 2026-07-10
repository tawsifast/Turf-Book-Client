// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@heroui/styles"; // HeroUI v3 Styles
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TurfPulse | Premium Sports Turf Booking",
  description: "Book your favorite futsal, cricket, and badminton courts instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // এখানে আমরা light ক্লাস এবং একটি সুন্দর সফ্ট অফ-হোয়াইট ব্যাকগ্রাউন্ড ব্যবহার করছি
    <html lang="en" className="light bg-slate-50 text-slate-900">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}