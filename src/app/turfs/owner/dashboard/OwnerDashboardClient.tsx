"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

interface OwnerTurf {
  _id: string;
  title: string;
  name: string;
  location: string;
  sportType: "futsal" | "cricket" | "badminton";
  price: number;
  pricePerHour: number;
  image: string;
  status?: string;
}

interface Booking {
  _id: string;
  turfId: string;
  turfName: string;
  location: string;
  pricePerHour: number;
  image: string;
  sportType: string;
  bookedAt: string;
}

interface EditFormData {
  name: string;
  location: string;
  sportType: string;
  pricePerHour: string;
}

type Tab = "turfs" | "bookings";

interface OwnerDashboardClientProps {
  userEmail: string;
  userName: string;
}

// ✅ email/name এখন server থেকে verified prop হিসেবে আসছে — এখানে আর session check/redirect করার দরকার নেই
export default function OwnerDashboardClient({ userEmail, userName }: OwnerDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("turfs");
  const [turfs, setTurfs] = useState<OwnerTurf[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    name: "",
    location: "",
    sportType: "",
    pricePerHour: "",
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsDataLoading(true);
      try {
        const [turfsRes, bookingsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/v1/user-items?email=${userEmail}`),
          fetch(`http://localhost:5000/api/my-bookings?email=${userEmail}`),
        ]);
        const turfsData = await turfsRes.json();
        const bookingsData = await bookingsRes.json();

        if (turfsData.success) {
          const normalized: OwnerTurf[] = turfsData.data.map((item: any) => ({
            ...item,
            name: item.title,
            pricePerHour: item.price,
            status: item.status || "pending",
          }));
          setTurfs(normalized);
        }
        if (bookingsData.success) setBookings(bookingsData.data);
      } catch (error) {
        console.error("Failed to load owner data:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  async function handleDelete(id: string, name: string): Promise<void> {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/ownerTurfs/${id}?email=${userEmail}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setTurfs((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdate(id: string): Promise<void> {
    const {data:token} = await authClient.token();
        console.log(token, "token"); 
    try {
      const response = await fetch(`http://localhost:5000/api/ownerTurfs/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
         authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify({
          name: editFormData.name,
          location: editFormData.location,
          sportType: editFormData.sportType,
          pricePerHour: editFormData.pricePerHour,
          userEmail,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setTurfs((prev) =>
          prev.map((t) =>
            t._id === id
              ? {
                  ...t,
                  name: editFormData.name,
                  title: editFormData.name,
                  location: editFormData.location,
                  sportType: editFormData.sportType as OwnerTurf["sportType"],
                  pricePerHour: Number(editFormData.pricePerHour),
                  price: Number(editFormData.pricePerHour),
                }
              : t
          )
        );
        setEditingId(null);
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function startEditing(turf: OwnerTurf): void {
    setEditingId(turf._id);
    setEditFormData({
      name: turf.name,
      location: turf.location,
      sportType: turf.sportType,
      pricePerHour: String(turf.pricePerHour),
    });
  }

  function getStatusStyle(status?: string): string {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Dashboard</h1>
          <p className="text-slate-500 text-sm">
            Logged in as: <span className="text-emerald-600 font-semibold">{userEmail}</span>
          </p>
        </div>
        <Link
          href="/turfs/add"
          className="bg-slate-900 hover:bg-emerald-600 text-white text-sm font-bold px-5 py-3 rounded-xl transition self-start sm:self-center"
        >
          + Add New Turf
        </Link>
      </div>

      <div className="flex gap-2 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("turfs")}
          className={`px-4 py-2 text-sm font-bold border-b-2 -mb-px ${
            activeTab === "turfs" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
          }`}
        >
          My Turfs
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 text-sm font-bold border-b-2 -mb-px ${
            activeTab === "bookings" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
          }`}
        >
          My Bookings
        </button>
      </div>

      {isDataLoading ? (
        <div className="text-center py-20">
          <span className="animate-spin inline-block w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full" />
        </div>
      ) : activeTab === "turfs" ? (
        turfs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-white">
            <span className="text-4xl">🏟️</span>
            <h3 className="text-lg font-bold text-slate-800 mt-4">You Haven&apos;t Listed Any Arenas</h3>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <th className="px-6 py-4">Arena Info</th>
                    <th className="px-6 py-4">Sport</th>
                    <th className="px-6 py-4">Price /hr</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {turfs.map((turf) => {
                    const isEditing = editingId === turf._id;
                    return (
                      <tr key={turf._id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={turf.image} className="w-12 h-9 object-cover rounded-lg" alt="" />
                          {isEditing ? (
                            <div className="flex flex-col gap-1">
                              <input
                                type="text"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                className="border p-1.5 rounded-lg text-xs w-full max-w-[180px]"
                                placeholder="Name"
                              />
                              <input
                                type="text"
                                value={editFormData.location}
                                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                                className="border p-1.5 rounded-lg text-xs w-full max-w-[180px]"
                                placeholder="Location"
                              />
                            </div>
                          ) : (
                            <div>
                              <p className="font-bold text-slate-900">{turf.name}</p>
                              <p className="text-[11px] text-slate-400">📍 {turf.location}</p>
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {isEditing ? (
                            <select
                              value={editFormData.sportType}
                              onChange={(e) => setEditFormData({ ...editFormData, sportType: e.target.value })}
                              className="border p-1.5 rounded-lg text-xs"
                            >
                              <option value="futsal">Futsal</option>
                              <option value="cricket">Cricket</option>
                              <option value="badminton">Badminton</option>
                            </select>
                          ) : (
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-xs capitalize font-semibold">
                              {turf.sportType}
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 font-bold">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editFormData.pricePerHour}
                              onChange={(e) => setEditFormData({ ...editFormData, pricePerHour: e.target.value })}
                              className="border p-1.5 rounded-lg w-20 text-xs"
                            />
                          ) : (
                            `৳${turf.pricePerHour}`
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-xs font-bold border rounded-full uppercase ${getStatusStyle(turf.status)}`}>
                            {turf.status || "pending"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          {isEditing ? (
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleUpdate(turf._id)} className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg">
                                Save
                              </button>
                              <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg">
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <button onClick={() => startEditing(turf)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg">
                                Edit
                              </button>
                              <button onClick={() => handleDelete(turf._id, turf.name)} className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg">
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-white">
          <span className="text-4xl">📅</span>
          <h3 className="text-lg font-bold text-slate-800 mt-4">No Bookings Yet</h3>
          <Link href="/turfs" className="text-emerald-600 font-bold text-sm underline mt-2 inline-block">
            Browse Turfs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const imageSrc =
              booking.image && booking.image.trim() !== ""
                ? booking.image
                : "https://images.unsplash.com/photo-1517649763962-0c623066013b";
            return (
              <div key={booking._id} className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 shadow-sm">
                <div className="relative w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <Image src={imageSrc} alt={booking.turfName} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between grow space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {booking.sportType}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(booking.bookedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mt-1">{booking.turfName}</h3>
                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">📍 {booking.location}</p>
                  </div>
                  <div className="border-t border-slate-50 pt-3 flex items-center justify-between">
                    <p className="text-base font-black text-emerald-600">৳{booking.pricePerHour}</p>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-lg border border-blue-100">Confirmed</span>
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