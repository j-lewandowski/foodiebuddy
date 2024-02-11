import { create } from "zustand";

type RatingStore = {
  rating: string;
  setRating: (rating: string) => void;
};

export const useRating = create<RatingStore>((set) => ({
  rating: "B",
  setRating: (rating) => set({ rating }),
}));
