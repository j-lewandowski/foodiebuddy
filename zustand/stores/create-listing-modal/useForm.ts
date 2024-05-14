import { create } from "zustand";

export interface RestaurantData {
  name: string;
  location?: string;
  imageLink?: null | string;
  imageFile?: null | File;
  rating: number;
  recommendedFood: string[];
  lat: number | null;
  lng: number | null;
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
  lat: null,
  lng: null,
};

export const useForm = create<useFormStore>()((set) => ({
  restaurantData: initialState,
  setRestaurantData: (data) => set({ restaurantData: data }),
  reset: () => set({ restaurantData: initialState }),
}));
