import { create } from "zustand";

export interface RestaurantData {
  name: string;
  location?: string;
  imageLink?: null | string;
  imageFile?: null | File;
  rating: number;
  recommendedFood: string[];
}

interface useFormStore {
  restaurantData: RestaurantData;
  setRestaurantData: (data: RestaurantData) => void;
  reset: () => void;
}

const initialState = {
  name: "",
  image: null,
  rating: 5.0,
  recommendedFood: [],
};

export const useForm = create<useFormStore>()((set) => ({
  restaurantData: initialState,
  setRestaurantData: (data) => set({ restaurantData: data }),
  reset: () => set({ restaurantData: initialState }),
}));
