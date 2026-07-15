"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

interface NavLink {
  name: string;
  path: string;
}

// ✅ এই ৪টা লিংক সবসময় দেখাবে, লগইন অবস্থা যাই হোক না কেন
const coreLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Explore Turfs", path: "/turfs" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as
    | { role?: string; name: string; image?: string | null | undefined }
    | undefined;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ dropdown-এর বাইরে ক্লিক করলে বন্ধ হয়ে যাবে
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = isMounted && !isPending && !!session;
  const showLoading = isMounted && isPending;
  const isAdmin = user?.role === "admin";

  // ✅ role-ভিত্তিক dashboard links, coreLinks এর সাথে মেশানো হচ্ছে না — আলাদা dropdown এ থাকবে
  const dashboardLinks: NavLink[] = isAdmin
    ? [
        { name: "Add Turf", path: "/turfs/add" },
        { name: "Admin Dashboard", path: "/turfs/admin" },
      ]
    : [
        { name: "Add Turf", path: "/turfs/add" },
        { name: "My Dashboard", path: "/turfs/owner" },
      ];

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsOpen(false);
          router.push("/");
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-slate-900">
            <span className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">⚽</span>
            Turf<span className="text-emerald-600">Pulse</span>
          </Link>

          {/* Desktop: core links সবসময় দেখাবে */}
          <div className="hidden md:flex items-center gap-6">
            {coreLinks.map((route) => (
              <Link key={route.path} href={route.path} className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                {route.name}
              </Link>
            ))}

            {/* ✅ লগইন থাকলে "Dashboard" নামে একটা dropdown, ক্লাটার কমাতে সব role-link এখানে জমা */}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                  <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-slate-200 rounded-xl shadow-lg py-2 min-w-[180px]">
                    {dashboardLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {showLoading ? (
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-emerald-600 animate-spin" />
            ) : isLoggedIn && user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                  <div className="text-right">
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isAdmin ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {user.role}
                    </span>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{user.name}</p>
                  </div>
                  <Avatar>
                    <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image ?? undefined} />
                    <Avatar.Fallback className="text-zinc-950 font-bold">{user?.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition flex items-center gap-1.5"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
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

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — core links + (লগইন থাকলে) dashboard links একসাথে, section আলাদা করা */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {isLoggedIn && user && (
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl my-2 border border-slate-100">
              <Avatar>
                <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image ?? undefined} />
                <Avatar.Fallback className="text-zinc-950 font-bold">{user?.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
              <div>
                <p className="text-xs text-slate-400 font-medium capitalize">
                  Logged in as <span className="font-bold text-slate-600">({user.role})</span>
                </p>
                <p className="text-sm font-black text-slate-800">{user.name}</p>
              </div>
            </div>
          )}

          {coreLinks.map((route) => (
            <Link key={route.path} href={route.path} onClick={() => setIsOpen(false)} className="block text-base font-medium text-slate-600 hover:text-emerald-600 py-2">
              {route.name}
            </Link>
          ))}

          {isLoggedIn && (
            <>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-3 pb-1 border-t border-slate-100 mt-2">
                Dashboard
              </p>
              {dashboardLinks.map((link) => (
                <Link key={link.path} href={link.path} onClick={() => setIsOpen(false)} className="block text-base font-medium text-slate-600 hover:text-emerald-600 py-2">
                  {link.name}
                </Link>
              ))}
            </>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {!showLoading && isLoggedIn ? (
              <button onClick={handleLogout} className="w-full text-center font-bold text-rose-600 bg-rose-50 py-2.5 rounded-xl flex items-center justify-center gap-2">
                <LogOut size={16} />
                Logout
              </button>
            ) : !showLoading ? (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center font-semibold text-slate-700 py-2.5">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-emerald-600 text-white font-semibold py-2.5 rounded-xl">
                  Get Started
                </Link>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}