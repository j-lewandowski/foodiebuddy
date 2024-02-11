import { create } from "zustand";

type RestaurantStore = {
  name: string;
  rating: number;
  image: string | null;
  setValue: (data: { name: string; value: string | number | null }) => void;
};

export const useRestaurantForm = create<RestaurantStore>((set) => ({
  name: "",
  rating: 3,
  image: null,
  setValue: (data: { name: string; value: number | string | null }) =>
    set((state) => ({ ...state, [data.name]: data.value })),
}));
