"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SportType } from "@/types/turf";
import { authClient } from "@/lib/auth-client";

export default function AddTurfPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session, isPending: isAuthPending } = authClient.useSession();
    const owner = session?.user;

  // ফর্মের স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    sportType: "futsal" as SportType,
    pricePerHour: "",
    image: "",
    description: "",
  });
  console.log(formData, "formdata");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ব্যাকএন্ড এপিআই-তে পোস্ট রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch("http://localhost:5000/api/allTurfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.name, // ব্যাকএন্ডে আমরা 'title' ভ্যালিডেট করেছিলাম
          location: formData.location,
          sportType: formData.sportType,
          price: Number(formData.pricePerHour), // ডাটাবেজে নাম্বার হিসেবে রাখার জন্য
          image: formData.image,
          description: formData.description,
          status: "pending", // ⚡ নতুন টর্ফের স্ট্যাটাস ডিফল্টভাবে pending থাকবে
          ownerName: owner?.name,
          ownerEmail: owner?.email,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("🎉 Arena successfully listed!");
        // ফর্ম সফলভাবে সাবমিট হলে মেইন টার্ফ পেজে রিডাইরেক্ট করবে
        router.push("/turfs");
        router.refresh();
      } else {
        alert(` Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Could not connect to the backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb back navigation */}
      <nav className="text-sm font-medium text-slate-500 mb-6">
        <Link href="/turfs" className="hover:text-emerald-600 transition">
          ← Cancel and Go Back
        </Link>
      </nav>

      {/* Form Container Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            List a New Arena
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Fill out the information below to register your turf onto our
            platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 1. Arena Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Arena Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. King of Futsal Ground"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>

            {/* 2. Primary Sport Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Sport Category
              </label>
              <select
                value={formData.sportType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sportType: e.target.value as SportType,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition capitalize"
              >
                <option value="futsal">Futsal</option>
                <option value="cricket">Cricket</option>
                <option value="badminton">Badminton</option>
              </select>
            </div>

            {/* 3. Detailed Location */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Location / Address
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Plot 42, Road 12, GEC, Chattogram"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>

            {/* 4. Price Per Hour */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Price per Hour (BDT)
              </label>
              <input
                type="number"
                required
                min="300"
                max="5000"
                placeholder="e.g. 1000"
                value={formData.pricePerHour}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerHour: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>

            {/* 5. Image Showcase Link */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Banner Image URL
              </label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>

            {/* 6. Overview Description */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Description & Rules
              </label>
              <textarea
                rows={4}
                required
                placeholder="Provide a detailed overview of your turf pitch quality, spikes allowed or not, and amenities available..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition resize-none"
              />
            </div>
          </div>

          {/* Form Actions Section */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link
              href="/turfs"
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/10 transition duration-200 text-sm flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Publishing...
                </>
              ) : (
                "Publish Arena"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
