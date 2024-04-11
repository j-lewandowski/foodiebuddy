import { create } from "zustand";

export interface RestaurantData {
  name: string;
}

interface useFormStore {
  restaurantData: RestaurantData;
  setRestaurantData: (data: RestaurantData) => void;
}

export const useForm = create<useFormStore>()((set) => ({
  restaurantData: {
    name: "",
  },
  setRestaurantData: (data) => set({ restaurantData: data }),
}));
