"use client";

import { useState, type FormEvent } from "react";
import type { SportType } from "@/types/turf";

interface AddTurfFormData {
  name: string;
  description: string;
  pricePerHour: string; // input থেকে সবসময় string আসে, submit করার সময় Number() করবো
  sportType: SportType;
  location: string;
  imageUrl: string;
}

export default function AddTurfPage() {
  // ⚠️ আপাতত mock — এই check আসল auth state দিয়ে replace হবে backend আসলে
  const isLoggedIn = true;

  const [formData, setFormData] = useState<AddTurfFormData>({
    name: "",
    description: "",
    pricePerHour: "",
    sportType: "futsal",
    location: "",
    imageUrl: "",
  });

  if (!isLoggedIn) {
    // পরে middleware/redirect দিয়ে handle হবে; আপাতত simple message
    return <p className="text-center py-20">Redirecting to login...</p>;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const payload = { ...formData, pricePerHour: Number(formData.pricePerHour) };
    console.log("New turf submitted:", payload); // পরে POST request হবে
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Add a New Turf</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Turf Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <textarea
          placeholder="Full Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2 h-28"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <input
          type="number"
          placeholder="Price per Hour (৳)"
          value={formData.pricePerHour}
          onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2"
          required
        />

        <select
          value={formData.sportType}
          onChange={(e) => setFormData({ ...formData, sportType: e.target.value as SportType })}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="futsal">Futsal</option>
          <option value="cricket">Cricket</option>
          <option value="badminton">Badminton</option>
        </select>

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />

        <button type="submit" className="bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition">
          Submit Turf
        </button>
      </form>
    </div>
  );
}