"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Turf } from "@/types/turf";
import { authClient } from "@/lib/auth-client";

export default function BookNowButton({ turf }: { turf: Turf }) {
  const [isBooking, setIsBooking] = useState(false);
  const router = useRouter();

  const { data: session, isPending: isAuthPending } = authClient.useSession();

  const handleBooking = async (): Promise<void> => {
    const userEmail =
      typeof session?.user === "string" ? session.user : session?.user?.email;
    const userName =
      typeof session?.user === "string" ? session.user : session?.user?.name;

    if (!userEmail) {
      alert("Please log in to book this arena!");
      return;
    }

    const confirmBook = confirm(`Do you want to book "${turf.name}"?`);
    if (!confirmBook) return;

    setIsBooking(true);

    const { data: token } = await authClient.token();
    try {
      // ব্যাকএন্ড API-তে বুকিং ডাটা পাঠানো হচ্ছে
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify({
          turfId: turf._id,
          turfName: turf.name,
          location: turf.location,
          pricePerHour: turf.pricePerHour,
          image: turf.image,
          sportType: turf.sportType,
          userEmail,
          userName,
          bookedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Booking successful!");
        // আপনার রিকোয়েস্ট অনুযায়ী ইউজারকে তার বুকিং পেজে রিডাইরেক্ট করা হচ্ছে
        router.push("/turfs/owner/dashboard");
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
