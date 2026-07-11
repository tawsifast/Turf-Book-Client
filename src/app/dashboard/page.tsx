"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// মক বুকিং ডাটা টাইপ
type BookingHistory = {
  id: string;
  turfName: string;
  image: string;
  sportType: "futsal" | "cricket" | "badminton";
  date: string;
  timeSlot: string;
  amountPaid: number;
  status: "confirmed" | "completed" | "cancelled";
};

// প্রজেক্টের জন্য ডাইনামিক রিয়েল ডাটা সেট (২০২৬ সালের কনটেক্সটে)
const mockBookings: BookingHistory[] = [
  {
    id: "BK-9081",
    turfName: "Anannya Sports Arena",
    image:
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=600&auto=format&fit=crop",
    sportType: "futsal",
    date: "July 15, 2026",
    timeSlot: "08:00 PM - 09:00 PM",
    amountPaid: 1200,
    status: "confirmed",
  },
  {
    id: "BK-7742",
    turfName: "Dampara Futsal & Cricket Ground",
    image:
      "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=600&auto=format&fit=crop",
    sportType: "cricket",
    date: "July 08, 2026",
    timeSlot: "04:00 PM - 06:00 PM",
    amountPaid: 2400,
    status: "completed",
  },
  {
    id: "BK-6109",
    turfName: "Smash Zone Badminton Court",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop",
    sportType: "badminton",
    date: "June 28, 2026",
    timeSlot: "09:00 PM - 10:00 PM",
    amountPaid: 600,
    status: "cancelled",
  },
];

export default function UserDashboard() {
  const [bookings, setBookings] = useState<BookingHistory[]>(mockBookings);

  // ক্যান্সেল করার মেকানিজম হ্যান্ডলার
  const handleCancelBooking = (id: string) => {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this booking slot?",
    );
    if (confirmCancel) {
      setBookings(
        bookings.map((b) =>
          b.id === id ? { ...b, status: "cancelled" as const } : b,
        ),
      );
    }
  };

  // স্ট্যাটাস ভিত্তিক ব্যাজ কালার জেনারেটর
  const getStatusStyles = (status: BookingHistory["status"]) => {
    if (status === "confirmed")
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (status === "completed")
      return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-rose-50 text-rose-700 border-rose-200";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Banner */}
      <div className="mb-10 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Player Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-3 tracking-tight">
            Welcome Back, Champ!
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-md">
            Check your upcoming match schedules, book new fields, or review your
            performance history.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-emerald-600/10 to-transparent opacity-50 pointer-events-none" />
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Bookings
          </p>
          <p className="text-2xl font-black text-slate-800 mt-1">
            {bookings.length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Active Matches
          </p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {bookings.filter((b) => b.status === "confirmed").length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Spent
          </p>
          <p className="text-2xl font-black text-slate-800 mt-1">
            ৳
            {bookings
              .filter((b) => b.status !== "cancelled")
              .reduce((sum, b) => sum + b.amountPaid, 0)}
          </p>
        </div>
      </div>

      {/* Booking History Section */}
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-5">
          Your Booking Schedule
        </h2>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all hover:border-slate-300"
              >
                {/* Left Side: Image + Details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={booking.image}
                      alt={booking.turfName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base tracking-tight">
                        {booking.turfName}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border capitalize ${getStatusStyles(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      📅 {booking.date}{" "}
                      <span className="mx-1 text-slate-300">|</span> ⏰{" "}
                      {booking.timeSlot}
                    </p>
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mt-1.5">
                      ID: {booking.id} • Paid{" "}
                      <span className="text-slate-700">
                        ৳{booking.amountPaid}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right Side: Quick Action Button */}
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="sm:self-center border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200 self-start"
                  >
                    Cancel Slot
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white">
            <p className="text-slate-400 text-sm">
              You haven`t booked any arenas yet.
            </p>
            <Link
              href="/turfs"
              className="text-emerald-600 text-xs font-bold mt-2 inline-block hover:underline"
            >
              Book Your First Turf →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
