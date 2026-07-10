import Image from "next/image";
import { notFound } from "next/navigation";
import { mockTurfs } from "@/lib/mockData";
import type { Turf } from "@/types/turf";
import TurfCard from "@/components/shared/TurfCard";
import { Button } from "@heroui/react";

interface TurfDetailsPageProps {
  // 1. Update the type definition so params is treated as a Promise
  params: Promise<{ id: string }>; 
}

// 2. Change the component to an async function
export default async function TurfDetailsPage({ params }: TurfDetailsPageProps) {
  
  // 3. Await the params object before destructuring or reading values
  const { id } = await params;

  // 4. Match using the resolved id string
  const turf: Turf | undefined = mockTurfs.find((t) => t._id === id);

  if (!turf) {
    notFound();
  }

  const relatedTurfs: Turf[] = mockTurfs.filter(
    (t) => t.sportType === turf.sportType && t._id !== turf._id
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-gray-100 mb-6">
        <Image src={turf.images[0] ?? "/turfs/placeholder.jpg"} alt={turf.name} fill className="object-cover" />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{turf.name}</h1>
          <p className="text-gray-500">{turf.location}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-600">৳{turf.pricePerHour}/hr</p>
          <p className="text-yellow-500">★ {turf.rating}</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-2">Overview</h2>
        <p className="text-gray-600">{turf.description}</p>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-2">Key Information</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="border rounded-lg p-3">
            <p className="text-gray-500">Sport</p>
            <p className="font-medium capitalize">{turf.sportType}</p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="text-gray-500">Availability</p>
            <p className="font-medium">{turf.isAvailable ? "Available" : "Booked"}</p>
          </div>
          <div className="border rounded-lg p-3">
            <p className="text-gray-500">Price</p>
            <p className="font-medium">৳{turf.pricePerHour}/hr</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-2">Reviews</h2>
        <p className="text-gray-500 text-sm">No reviews yet. Be the first to book and review!</p>
      </section>

      <Button
        disabled={!turf.isAvailable}
        className="w-full sm:w-auto bg-emerald-600 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition"
      >
        {turf.isAvailable ? "Book Now" : "Currently Unavailable"}
      </Button>

      {relatedTurfs.length > 0 && (
        <section className="mt-12">
          <h2 className="font-semibold text-lg mb-4">Related Turfs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTurfs.map((t: Turf) => (
              <TurfCard key={t._id} turf={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}