import { Restaurant } from "@prisma/client";
import { create } from "zustand";

interface UserProps {
  userId: number;
  setUserId: (id: number) => void;
  rankingId: number;
  setRankingId: (id: number) => void;
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  selectedTier: "ALL" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
  setSelectedTier: (
    tier: "ALL" | "S" | "A" | "B" | "C" | "D" | "E" | "F"
  ) => void;
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
}

export const useUser = create<UserProps>()((set) => ({
  userId: -1,
  setUserId: (id) => set({ userId: id }),
  rankingId: -1,
  setRankingId: (id) => set({ rankingId: id }),
  restaurants: [],
  setRestaurants: (restaurants) => set({ restaurants }),
  selectedTier: "ALL",
  setSelectedTier: (tier) => set({ selectedTier: tier }),
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant) =>
    set({ selectedRestaurant: restaurant }),
}));
