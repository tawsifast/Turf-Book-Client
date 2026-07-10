import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-3">TurfBook</h3>
          <p className="text-sm">Book futsal, cricket, and badminton turfs across Chattogram in seconds.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/turfs" className="hover:text-emerald-400">Explore Turfs</Link></li>
            <li><Link href="/about" className="hover:text-emerald-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Agrabad, Chattogram, Bangladesh</li>
            <li>support@turfbook.com</li>
            <li>+880 1XXX-XXXXXX</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-emerald-400">Facebook</a>
            <a href="#" className="hover:text-emerald-400">Instagram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-sm py-4">
        © 2026 TurfBook. All rights reserved.
      </div>
    </footer>
  );
}