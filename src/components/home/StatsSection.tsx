// src/components/home/StatsSection.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", bookings: 120 },
  { name: "Feb", bookings: 210 },
  { name: "Mar", bookings: 180 },
  { name: "Apr", bookings: 340 },
  { name: "May", bookings: 310 },
  { name: "Jun", bookings: 490 },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          
          {/* Text Metrics */}
          <div className="space-y-6 lg:col-span-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              Our Growth
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Trusted by Thousands of Players in Chattogram
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We connect passionate players with the premium turfs across the city. Look at our monthly booking growth this year!
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-slate-100 p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-extrabold text-slate-900">12k+</p>
                <p className="text-xs text-slate-500 font-medium">Happy Players</p>
              </div>
              <div className="border border-slate-100 p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-extrabold text-emerald-600">45+</p>
                <p className="text-xs text-slate-500 font-medium">Premium Fields</p>
              </div>
            </div>
          </div>

          {/* Recharts Graphical Display */}
          <div className="lg:col-span-2 h-72 w-full p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0" }}
                  labelStyle={{ fontWeight: "bold", color: "#0f172a" }}
                />
                <Bar dataKey="bookings" fill="#059669" radius={[6, 6, 0, 0]} name="Total Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </section>
  );
}