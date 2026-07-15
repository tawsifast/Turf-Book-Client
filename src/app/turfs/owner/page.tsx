import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import OwnerDashboardClient from "./dashboard/OwnerDashboardClient";



export default async function OwnerDashboardPage() {

  const session = await auth.api.getSession({ headers: await headers() });


  if (!session) {
    redirect("/login"); 
  }

   if (session.user.role === "admin") {
    redirect("/turfs/unauthorized");
  }


  return <OwnerDashboardClient userEmail={session.user.email} userName={session.user.name} />;
}