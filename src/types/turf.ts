// src/types/turf.ts

export type SportType = "futsal" | "cricket" | "badminton";

export interface Turf {
  _id: string;
  name: string;
  location: string;
  pricePerHour: number;
  sportType: SportType;
  images: string[];
  rating: number;
  isAvailable: boolean;
  description: string;
//   amenities: string[]; // যেমন: Floodlights, Changing Room, Parking (গর্জিয়াস ডিজাইনের জন্য)
  ownerId: string;
  createdAt: string;
}

export interface Booking {
  _id: string;
  turfId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}