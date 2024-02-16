import { create } from "zustand";

type RestaurantStore = {
  name: string;
  rating: number;
  image: string | null;
  city: string;
  coords: [number, number];
  recommendedFood: string[];
  googleMapsLink: string;

  setValue: (data: {
    name: string;
    value: string | number | null | number[];
  }) => void;
  addRecommendedFood: (food: string) => void;
  removeRecommendedFood: (index: number) => void;
};

export const useRestaurantForm = create<RestaurantStore>((set) => ({
  name: "",
  rating: 3,
  image: null,
  city: "",
  coords: [0, 0],
  googleMapsLink: "",
  recommendedFood: [],
  setValue: (data: {
    name: string;
    value: number | string | null | number[];
  }) => set((state) => ({ ...state, [data.name]: data.value })),
  addRecommendedFood: (food: string) =>
    set((state) => {
      state.recommendedFood.push(food);
      return { ...state, recommendedFood: state.recommendedFood };
    }),
  removeRecommendedFood: (index: number) =>
    set((state) => {
      state.recommendedFood.splice(index, 1);
      return { ...state, recommendedFood: state.recommendedFood };
    }),
}));
