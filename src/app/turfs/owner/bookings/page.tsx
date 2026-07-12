import Link from "next/link";
import Image from "next/image";

// এক্সপ্রেস ব্যাকএন্ড থেকে আসা বুকিং ডেটার টাইপ
interface Booking {
  _id: string;
  turfId: string;
  turfName: string;
  location: string;
  pricePerHour: number;
  image: string;
  sportType: string;
  userEmail: string;
  userName: string;
  bookedAt: string;
}

// সার্ভার সাইড থেকে নির্দিষ্ট ইউজারের বুকিং ডাটা ফেচ করার ফাংশন
async function getUserBookings(email: string): Promise<Booking[]> {
  try {
    // এক্সপ্রেস ব্যাকএন্ডের /api/my-bookings এন্ডপয়েন্টে রিকোয়েস্ট পাঠানো হচ্ছে
    const response = await fetch(
      `http://localhost:5000/api/my-bookings?email=${email}`,
      {
        cache: "no-store", // সবসময় ফ্রেশ ডেটা দেখানোর জন্য ক্যাশ অফ রাখা হয়েছে
      },
    );
    const resData = await response.json();

    if (resData.success) {
      return resData.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
}

export default async function UserBookingsPage() {
  // ⚠️ আপনার Auth সিস্টেমের সেশন থেকে এখানে লগইন করা ইউজারের ইমেইলটি রিলিজ করবেন
  const userEmail = "john@example.com";

  const bookings = await getUserBookings(userEmail);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and view your arena reservations
          </p>
        </div>
        <Link
          href="/turfs"
          className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm"
        >
          Book Another Arena
        </Link>
      </div>

      {/* যদি কোনো বুকিং না থাকে */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8">
          <div className="text-4xl mb-3">📅</div>
          <h3 className="text-lg font-bold text-slate-800">
            No Bookings Found
          </h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
            You haven`t booked any arena yet. Explore top turfs around you and
            secure your slot!
          </p>
          <Link
            href="/turfs"
            className="text-emerald-600 font-bold text-sm underline mt-4 inline-block"
          >
            Browse Turfs Now
          </Link>
        </div>
      ) : (
        /* বুকিং লিস্ট গ্রিড ভিউ */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const imageSrc =
              booking.image && booking.image.trim() !== ""
                ? booking.image
                : "https://images.unsplash.com/photo-1517649763962-0c623066013b";

            return (
              <div
                key={booking._id}
                className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition duration-200"
              >
                {/* ইমেজ সেকশন */}
                <div className="relative w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={imageSrc}
                    alt={booking.turfName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* ইনফরমেশন সেকশন */}
                <div className="flex flex-col justify-between grow space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {booking.sportType}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(booking.bookedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                      {booking.turfName}
                    </h3>

                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                      📍{" "}
                      <span className="truncate max-w-50 sm:max-w-xs">
                        {booking.location}
                      </span>
                    </p>
                  </div>

                  {/* প্রাইস রেট ও স্ট্যাটাস ট্যাগ */}
                  <div className="border-t border-slate-50 pt-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        Amount Paid
                      </p>
                      <p className="text-base font-black text-emerald-600">
                        ৳{booking.pricePerHour}
                      </p>
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-lg border border-blue-100">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
