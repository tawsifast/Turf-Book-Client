import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AdminDashboardClient from "./dashboard/AdminDashboardClient";


export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  // ✅ role check এখন সরাসরি server-এ, MongoDB session data দিয়ে — কোনো Edge limitation নেই
   if (!session) {
      redirect("/login"); 
    }
  if (!session || session.user.role !== "admin") {
    redirect("/turfs/unauthorized");
  }

  return <AdminDashboardClient userEmail={session.user.email} />;
}