"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface Turf {
  _id: string;
  title: string;
  name: string; // normalized alias of title, UI-friendly
  location: string;
  sportType: "futsal" | "cricket" | "badminton";
  price: number;
  pricePerHour: number; // normalized alias of price
  image: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
}

interface EditFormData {
  name: string;
  sportType: string;
  pricePerHour: string;
}

export default function ManageItemsPage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const currentUserEmail = session?.user?.email;

  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    name: "",
    sportType: "",
    pricePerHour: "",
  });

  const fetchUserTurfs = async (): Promise<void> => {
    if (!currentUserEmail) return;

    try {
      setIsDataLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/v1/user-items?email=${currentUserEmail}`,
      );
      const resData = await response.json();
      if (resData.success) {
        const normalized: Turf[] = resData.data.map((item: any) => ({
          ...item,
          name: item.title,
          pricePerHour: item.price,
        }));
        setTurfs(normalized);
      }
    } catch (error) {
      console.error("Failed to load user items:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthPending && currentUserEmail) {
      fetchUserTurfs();
    }
  }, [currentUserEmail, isAuthPending]);

  const handleDelete = async (id: string, name: string): Promise<void> => {
    if (!currentUserEmail) return alert("You must be logged in!");
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/allTurfs/${id}?email=${currentUserEmail}`,
        { method: "DELETE" },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setTurfs(turfs.filter((t) => t._id !== id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string): Promise<void> => {
    if (!currentUserEmail) return alert("You must be logged in!");

    try {
      const response = await fetch(`http://localhost:5000/api/allTurfs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editFormData, userEmail: currentUserEmail }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setTurfs(
          turfs.map((t) =>
            t._id === id
              ? {
                  ...t,
                  name: editFormData.name,
                  title: editFormData.name,
                  sportType: editFormData.sportType as Turf["sportType"],
                  pricePerHour: Number(editFormData.pricePerHour),
                  price: Number(editFormData.pricePerHour),
                }
              : t,
          ),
        );
        setEditingId(null);
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const startEditing = (turf: Turf): void => {
    setEditingId(turf._id);
    setEditFormData({
      name: turf.name,
      sportType: turf.sportType,
      pricePerHour: String(turf.pricePerHour),
    });
  };

  if (isAuthPending || (currentUserEmail && isDataLoading)) {
    return (
      <div className="text-center py-20">
        <span className="animate-spin inline-block w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full"></span>
        <p className="text-slate-500 text-sm mt-2">
          Verifying session & loading data...
        </p>
      </div>
    );
  }

  if (!isAuthPending && !session) {
    return (
      <div className="text-center py-20 max-w-sm mx-auto">
        <span className="text-4xl">🔒</span>
        <h3 className="text-lg font-bold text-slate-800 mt-4">Access Denied</h3>
        <p className="text-slate-500 text-sm mt-1 mb-4">
          You must be signed in to manage your registered arenas.
        </p>
        <Link
          href="/login"
          className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            My Listed Arenas
          </h1>
          <p className="text-slate-500 text-sm">
            Logged in as:{" "}
            <span className="text-emerald-600 font-semibold">
              {currentUserEmail}
            </span>
          </p>
        </div>
      </div>

      {turfs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-white">
          <span className="text-4xl">🏟️</span>
          <h3 className="text-lg font-bold text-slate-800 mt-4">
            You Haven`t Listed Any Arenas
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Any sports grounds you add using this account will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase px-6">
                  <th className="px-6 py-4">Arena Info</th>
                  <th className="px-6 py-4">Sport</th>
                  <th className="px-6 py-4">Price /hr</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {turfs.map((turf) => {
                  const isEditing = editingId === turf._id;
                  return (
                    <tr key={turf._id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={turf.image}
                          className="w-12 h-9 object-cover rounded-lg"
                          alt=""
                        />
                        {isEditing ? (
                          <input
                            type="text"
                            value={editFormData.name}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                name: e.target.value,
                              })
                            }
                            className="border p-1.5 rounded-lg text-slate-800 text-xs focus:border-emerald-500 outline-none"
                          />
                        ) : (
                          <div>
                            <p className="font-bold text-slate-900">
                              {turf.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              📍 {turf.location}
                            </p>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editFormData.sportType}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                sportType: e.target.value,
                              })
                            }
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
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                pricePerHour: e.target.value,
                              })
                            }
                            className="border p-1.5 rounded-lg w-20 text-xs"
                          />
                        ) : (
                          `৳${turf.pricePerHour}`
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdate(turf._id)}
                              className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => startEditing(turf)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(turf._id, turf.name)}
                              className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg"
                            >
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
      )}
    </div>
  );
}
