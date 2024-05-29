import { create } from "zustand";
import { Restaurant } from "@prisma/client";

interface RestaurantsStore {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;
}

export const useRestaurants = create<RestaurantsStore>((set) => ({
  restaurants: [],
  setRestaurants: (restaurants) => set({ restaurants }),
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant) =>
    set({ selectedRestaurant: restaurant }),
}));
