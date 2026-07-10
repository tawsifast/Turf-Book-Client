"use client";

import { useState } from "react";
import { mockTurfs } from "@/lib/mockData";
import type { Turf } from "@/types/turf";

export default function ManageTurfsPage() {
  const [turfs, setTurfs] = useState<Turf[]>(mockTurfs);

  function handleDelete(id: string): void {
    setTurfs((prev) => prev.filter((turf) => turf._id !== id));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Manage Your Turfs</h1>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Sport</th>
              <th className="px-4 py-3">Price/hr</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {turfs.map((turf: Turf) => (
              <tr key={turf._id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">{turf.name}</td>
                <td className="px-4 py-3 capitalize">{turf.sportType}</td>
                <td className="px-4 py-3">৳{turf.pricePerHour}</td>
                <td className="px-4 py-3">
                  <span className={turf.isAvailable ? "text-emerald-600" : "text-red-500"}>
                    {turf.isAvailable ? "Available" : "Booked"}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <a href={`/turfs/${turf._id}`} className="text-emerald-600 hover:underline">View</a>
                  <button onClick={() => handleDelete(turf._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {turfs.length === 0 && <p className="text-center py-10 text-gray-500">No turfs added yet.</p>}
      </div>
    </div>
  );
}