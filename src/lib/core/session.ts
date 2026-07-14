"use server"
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: {},
  });

  return session?.user || null;
};

export const requireRole = async (role: string) => {
  const user = await getUserSession();
  if(!user){
    redirect("/signin")
  }
  if(user.role !== role){
     redirect("/unauthorized")
  }
  return user;
}
