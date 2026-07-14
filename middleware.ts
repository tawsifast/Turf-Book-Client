import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// এখানে আপনার ডামি রোল চেকিং লজিক (বা সেশন চেক) বসাবেন
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // মনে করুন কুকি বা সেশন থেকে ইউজারের রোল পেলেন
  const userRole = request.cookies.get("role")?.value || "user"; 

  // ১. ইউজার যদি ওনার (Owner) রাউটে ঢুকতে চায় কিন্তু সে ওনার না হয়
  if (url.pathname.startsWith("/owner") && userRole !== "owner") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // ২. ইউজার যদি অ্যাডমিন (Admin) রাউটে ঢুকতে চায় কিন্তু সে অ্যাডমিন না হয়
  if (url.pathname.startsWith("/admin") && userRole !== "admin") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// এই মিডলওয়্যারটি কোন কোন রাউটে কাজ করবে তা ডিফাইন করুন
export const config = {
  matcher: ["/owner/:path*", "/admin/:path*"],
};