
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 💡 Better-Auth ইন্টিগ্রেশনের আগে টেস্ট করার জন্য এটাকে true/false করে দেখতে পারো
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // রিকোয়ারমেন্ট অনুযায়ী রুটস
  const publicRoutes = [
    { name: "Home", path: "/" },
    { name: "Explore Turfs", path: "/turfs" },
    { name: "About Us", path: "/about" },
  ];

  const privateRoutes = [
    { name: "Home", path: "/" },
    { name: "Explore Turfs", path: "/turfs" },
    { name: "Bookings", path: "/bookings" },
    { name: "Add Turf", path: "/items/add" },
    { name: "Manage Turfs", path: "/items/manage" },
  ];

  const activeRoutes = isLoggedIn ? privateRoutes : publicRoutes;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-xl tracking-tight text-slate-900"
          >
            <span className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              ⚽
            </span>
            Turf<span className="text-emerald-600">Pulse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {activeRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {route.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-sm font-semibold text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-xl transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-950"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow-md shadow-emerald-600/10"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          {activeRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-600 hover:text-emerald-600 py-2"
            >
              {route.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsOpen(false);
                }}
                className="w-full text-center font-semibold text-rose-600 bg-rose-50 py-2.5 rounded-xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center font-semibold text-slate-700 py-2.5"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-emerald-600 text-white font-semibold py-2.5 rounded-xl"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
