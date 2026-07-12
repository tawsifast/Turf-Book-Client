"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Turf } from "@/types/turf";

export default function BookNowButton({ turf }: { turf: Turf }) {
  const [isBooking, setIsBooking] = useState(false);
  const router = useRouter();

  // ⚠️ এখানে আপনার Auth সিস্টেম থেকে ইউজার ডাটা নিয়ে আসবেন। উদাহরণস্বরূপ নিচে একটি ডামি ইউজার দেওয়া হলো:
  const currentUser = {
    name: "John Doe",
    email: "john@example.com", 
  };

  const handleBooking = async () => {
    if (!currentUser.email) {
      alert("Please log in to book this arena!");
      return;
    }

    const confirmBook = confirm(`Do you want to book "${turf.name}"?`);
    if (!confirmBook) return;

    setIsBooking(true);

    try {
      // ব্যাকএন্ড API-তে বুকিং ডাটা পাঠানো হচ্ছে
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          turfId: turf._id,
          turfName: turf.name,
          location: turf.location,
          pricePerHour: turf.pricePerHour,
          image: turf.image,
          sportType: turf.sportType,
          userEmail: currentUser.email, // এই ইমেইল দিয়ে পরে ফিল্টার করা হবে
          userName: currentUser.name,
          bookedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Booking successful!");
        // আপনার রিকোয়েস্ট অনুযায়ী ইউজারকে তার বুকিং পেজে রিডাইরেক্ট করা হচ্ছে
        router.push("/turf/bookings");
      } else {
        alert(data.message || "Booking failed. Try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={isBooking}
      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3.5 rounded-xl transition duration-200 text-sm mt-2 shadow-lg shadow-emerald-600/10"
    >
      {isBooking ? "Processing Booking..." : "Book This Arena"}
    </button>
  );
}