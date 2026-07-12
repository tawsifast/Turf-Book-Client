"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";

interface Turf {
  _id: string;
  title: string;
  name: string;
  location: string;
  sportType: "futsal" | "cricket" | "badminton";
  price: number;
  pricePerHour: number;
  image: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
  status?: string; // ⚡ স্ট্যাটাস ফিল্ড যোগ করা হয়েছে
}

interface EditFormData {
  name: string;
  location: string; // ⚡ লোকেশন যোগ করা হয়েছে
  sportType: string;
  pricePerHour: string;
}

export default function ManageItemsPage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  const currentUserEmail = session?.user?.email;

  const [turfs, setTurfs] = useState<Turf[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  // এডিটিং স্টেট
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    name: "",
    location: "",
    sportType: "",
    pricePerHour: "",
  });

  // মোডাল ট্র্যাকিং স্টেট
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [turfToDelete, setTurfToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

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
          status: item.status || "pending", // ⚡ ব্যাকএন্ড থেকে আসা স্ট্যাটাস ম্যাপ করা হয়েছে
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

  // মোডাল ওপেন করার জন্য ট্রিগার
  const openDeleteModal = (id: string, name: string) => {
    setTurfToDelete({ id, name });
    setIsModalOpen(true);
  };

  // ⚡ মোডাল কনফার্মেশনের পর ডিলিট এক্সিকিউশন
  const confirmDelete = async (): Promise<void> => {
    if (!currentUserEmail || !turfToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/ownerTurfs/${turfToDelete.id}?email=${currentUserEmail}`,
        { method: "DELETE" },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setTurfs(turfs.filter((t) => t._id !== turfToDelete.id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      setTurfToDelete(null);
    }
  };

  const handleUpdate = async (id: string): Promise<void> => {
    if (!currentUserEmail) return alert("You must be logged in!");

    try {
      const response = await fetch(
        `http://localhost:5000/api/ownerTurfs/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editFormData,
            title: editFormData.name, // ব্যাকএন্ড title এক্সপেক্ট করলে
            location: editFormData.location,
            userEmail: currentUserEmail,
          }),
        },
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setTurfs(
          turfs.map((t) =>
            t._id === id
              ? {
                  ...t,
                  name: editFormData.name,
                  title: editFormData.name,
                  location: editFormData.location, // ⚡ স্টেট আপডেট
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
      location: turf.location, // ⚡ এডিটিং ফর্মে ডিফল্ট ভ্যালু সেট
      sportType: turf.sportType,
      pricePerHour: String(turf.pricePerHour),
    });
  };

  // স্ট্যাটাস টেক্সটের ওপর ভিত্তি করে টেইলেন্ড কালার জেনারেটর
  const getStatusStyle = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
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
                  <th className="px-6 py-4">Status</th>
                  {/* ⚡ স্ট্যাটাস হেডার */}
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
                          <div className="flex flex-col gap-1">
                            {/* টাইটেল ইনপুট */}
                            <input
                              type="text"
                              value={editFormData.name}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  name: e.target.value,
                                })
                              }
                              className="border p-1.5 rounded-lg text-slate-800 text-xs focus:border-emerald-500 outline-none w-full max-w-[200px]"
                              placeholder="Arena Name"
                            />
                            {/* ⚡ লোকেশন ইনপুট ফিল্ড */}
                            <input
                              type="text"
                              value={editFormData.location}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  location: e.target.value,
                                })
                              }
                              className="border p-1.5 rounded-lg text-slate-800 text-xs focus:border-emerald-500 outline-none w-full max-w-[200px]"
                              placeholder="Location"
                            />
                          </div>
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

                      {/* ⚡ স্ট্যাটাস ব্যাজ রেন্ডারিং */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 text-xs font-bold border rounded-full uppercase tracking-wider ${getStatusStyle(turf.status)}`}
                        >
                          {turf.status || "pending"}
                        </span>
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
                            {/* ⚡ ডিফল্ট উইন্ডো অ্যালার্টের বদলে মোডাল ওপেন হবে */}
                            <button
                              onClick={() =>
                                openDeleteModal(turf._id, turf.name)
                              }
                              className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-lg transition"
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

      {/* ⚡ HeroUI AlertDialog কনফার্মেশন মোডাল স্ট্রাকচার */}
      <AlertDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px] bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
              <AlertDialog.CloseTrigger onClick={() => setIsModalOpen(false)} />
              <AlertDialog.Header className="flex flex-col gap-2 items-start">
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-lg font-black text-slate-900">
                  Delete Turf Arena?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="py-3 text-slate-500 text-sm">
                <p>
                  Are you sure you want to permanently delete{" "}
                  <strong className="text-slate-900">
                    “{turfToDelete?.name}”
                  </strong>
                  ? This action will remove the listing entirely and cannot be
                  undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button
                  slot="close"
                  variant="tertiary"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 text-xs font-bold bg-slate-50 hover:bg-slate-100"
                >
                  Cancel
                </Button>
                <Button
                  slot="close"
                  variant="danger"
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/10"
                >
                  Delete Arena
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}
