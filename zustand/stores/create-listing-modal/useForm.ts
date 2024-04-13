import { create } from "zustand";

export interface RestaurantData {
  name: string;
  image: File | null;
}

interface useFormStore {
  restaurantData: RestaurantData;
  setRestaurantData: (data: RestaurantData) => void;
  reset: () => void;
}

const initialState = { name: "", image: null };

export const useForm = create<useFormStore>()((set) => ({
  restaurantData: initialState,
  setRestaurantData: (data) => set({ restaurantData: data }),
  reset: () => set({ restaurantData: initialState }),
}));
