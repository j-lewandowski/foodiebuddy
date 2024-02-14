import { create } from "zustand";

type RestaurantStore = {
  name: string;
  rating: number;
  image: string | null;
  city: string;
  coords: [number, number];
  googleMapsLink: string;

  setValue: (data: {
    name: string;
    value: string | number | null | number[];
  }) => void;
};

export const useRestaurantForm = create<RestaurantStore>((set) => ({
  name: "",
  rating: 3,
  image: null,
  city: "",
  coords: [0, 0],
  googleMapsLink: "",
  setValue: (data: {
    name: string;
    value: number | string | null | number[];
  }) => set((state) => ({ ...state, [data.name]: data.value })),
}));
