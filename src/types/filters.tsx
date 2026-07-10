import type { SportType } from "./turf";

export interface TurfFilters {
  search: string;
  sportType: SportType | "all";
  sortBy: "priceLowToHigh" | "priceHighToLow" | "ratingHighToLow";
}