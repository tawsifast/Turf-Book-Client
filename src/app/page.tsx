import Link from "next/link";
import TurfCard from "@/components/shared/TurfCard";
import type { Turf } from "@/types/turf";
import { mockTurfs } from "@/lib/mockData";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  const featuredTurfs: Turf[] = mockTurfs.slice(0, 3);

  return (
    <div>
     <Hero/>
    </div>
  );
}
