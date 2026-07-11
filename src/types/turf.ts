export type SportType = "futsal" | "cricket" | "badminton";

export interface Turf {
  _id: string;
  name: string;
  location: string;
  pricePerHour: number;
  sportType: SportType;
  image: string;
  rating: number;
  isAvailable: boolean;
  description: string;
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