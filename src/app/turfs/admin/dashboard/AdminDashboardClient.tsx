"use client";

import { useEffect, useState } from "react";
import type { SportType } from "@/types/turf";

interface AdminTurf {
  _id: string;
  title: string;
  location: string;
  sportType: SportType;
  price: number;
  image: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
  status: "pending" | "approved" | "rejected";
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
}

type Tab = "turfs" | "users";

interface AdminDashboardClientProps {
  userEmail: string;
}

export default function AdminDashboardClient({ userEmail }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("turfs");
  const [turfs, setTurfs] = useState<AdminTurf[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsDataLoading(true);
      try {
        const [turfsRes, usersRes] = await Promise.all([
          fetch(`http://localhost:5000/api/admin/turfs?email=${userEmail}`),
          fetch(`http://localhost:5000/api/admin/users?email=${userEmail}`),
        ]);
        const turfsData = await turfsRes.json();
        const usersData = await usersRes.json();

        if (turfsData.success) setTurfs(turfsData.data);
        if (usersData.success) setUsers(usersData.data);
      } catch (error) {
        console.error("Failed to load admin data:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  async function handleStatusChange(id: string, status: "approved" | "rejected"): Promise<void> {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/turfs/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, status }),
      });
      const data = await response.json();
      if (data.success) {
        setTurfs((prev) => prev.map((t) => (t._id === id ? { ...t, status } : t)));
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRoleChange(id: string, role: "user" | "admin"): Promise<void> {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, role }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
      } else {
        alert(data.message || "Failed to update role");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-black text-slate-900 mb-6">Admin Dashboard</h1>

      <div className="flex gap-2 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("turfs")}
          className={`px-4 py-2 text-sm font-bold border-b-2 -mb-px ${
            activeTab === "turfs" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
          }`}
        >
          Turf Approvals
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 text-sm font-bold border-b-2 -mb-px ${
            activeTab === "users" ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-500"
          }`}
        >
          Manage Users
        </button>
      </div>

      {isDataLoading ? (
        <div className="text-center py-20">
          <span className="animate-spin inline-block w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full" />
        </div>
      ) : activeTab === "turfs" ? (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">Turf</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {turfs.map((turf) => (
                <tr key={turf._id}>
                  <td className="px-4 py-3 font-semibold">{turf.title}</td>
                  <td className="px-4 py-3 text-slate-500">{turf.ownerEmail}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        turf.status === "approved"
                          ? "bg-emerald-100 text-emerald-600"
                          : turf.status === "rejected"
                            ? "bg-rose-100 text-rose-600"
                            : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {turf.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleStatusChange(turf._id, "approved")}
                      disabled={turf.status === "approved"}
                      className="px-3 py-1 bg-emerald-600 disabled:bg-slate-200 text-white text-xs font-bold rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(turf._id, "rejected")}
                      disabled={turf.status === "rejected"}
                      className="px-3 py-1 bg-rose-600 disabled:bg-slate-200 text-white text-xs font-bold rounded-lg"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="px-4 py-3 font-semibold">{u.name}</td>
                  <td className="px-4 py-3 text-slate-500">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role ?? "user"}</td>
                  <td className="px-4 py-3 text-right">
                    {u.role === "admin" ? (
                      <button onClick={() => handleRoleChange(u._id, "user")} className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg">
                        Revoke Admin
                      </button>
                    ) : (
                      <button onClick={() => handleRoleChange(u._id, "admin")} className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg">
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}