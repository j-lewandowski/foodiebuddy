import { create } from "zustand";

import RestaurantName from "@/app/map/_components/create-listing/steps/manual/RestaurantName";
import RestaurantImage from "@/app/map/_components/create-listing/steps/manual/RestaurantImage";
import RestaurantRating from "@/app/map/_components/create-listing/steps/manual/RestaurantRating";
import RestaurantRecommendedFood from "@/app/map/_components/create-listing/steps/manual/RestaurantRecommendedFood";
import RestaurantPreview from "@/app/map/_components/create-listing/steps/RestaurantPreview";
import AddWithGoogle from "@/app/map/_components/create-listing/steps/google/AddWithGoogle";
import RestaurantLocation from "@/app/map/_components/create-listing/steps/manual/RestaurantLocation";
import RestaurantFound from "@/app/map/_components/create-listing/steps/google/RestaurantFound";
import Decision from "@/app/map/_components/create-listing/steps/Decision";
import { ReactNode } from "react";

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

interface FormStore {
  restaurantData: RestaurantData;
  setRestaurantData: (data: RestaurantData) => void;

  formInputs: (() => JSX.Element)[];
  setFormInputs: (flow: "MANUAL" | "GOOGLE", pageIdx?: number) => void;

  page: number;
  next: () => void;
  isNextClickable: boolean;
  setIsNextClickable: (b: boolean) => void;
  prev: () => void;
  isPrevClickable: boolean;
  setPage: (idx: number) => void;
  isLastPage: boolean;

  isEditing: boolean;
  setIsEditing: (b: boolean) => void;

  reset: () => void;

  buttonText: string;

  googleLink: string;
  setGoogleLink: (link: string) => void;
}

const initialState = {
  name: "",
  image: null,
  rating: 5.0,
  recommendedFood: [],
  lat: null,
  lng: null,
};

const flows = {
  MANUAL: [
    Decision,
    RestaurantName,
    RestaurantImage,
    RestaurantRating,
    RestaurantRecommendedFood,
    RestaurantLocation,
    RestaurantPreview,
  ],
  GOOGLE: [Decision, AddWithGoogle, RestaurantFound],
};

export const useForm = create<FormStore>()((set, get) => {
  const evalButtonText = (page: number) => {
    if (page === flows.MANUAL.length - 1) {
      return "Zakończ";
    } else {
      return "Dalej";
    }
  };

  const evalIsPrevClickable = (page: number) => {
    return page > 0;
  };

  const evalIsNextClickable = (page: number, flow?: "GOOGLE" | "MANUAL") => {
    const currentPage = flow ? flows[flow][page] : get().formInputs[page];

    return (
      currentPage &&
      page > 0 &&
      ![
        RestaurantFound,
        RestaurantName,
        RestaurantLocation,
        AddWithGoogle,
      ].includes(currentPage)
    );
  };

  const runPageChecks = (page: number, flow?: "GOOGLE" | "MANUAL") => ({
    buttonText: evalButtonText(page),
    isLastPage: page === flows.MANUAL.length - 1,
    isPrevClickable: evalIsPrevClickable(page),
    isNextClickable: evalIsNextClickable(page, flow),
  });

  return {
    restaurantData: initialState,
    setRestaurantData: (data) => set({ restaurantData: data }),

    formInputs: flows.MANUAL,
    setFormInputs: (flow, pageIdx) =>
      set({
        formInputs: flows[flow],
        page: pageIdx || get().page,
        ...runPageChecks(pageIdx || get().page, flow),
      }),

    page: 0,
    next: () => {
      set((state) => ({
        page: state.page + 1,
        ...runPageChecks(state.page + 1),
      }));
    },
    isNextClickable: false,
    setIsNextClickable: (b) => set({ isNextClickable: b }),
    prev: () => {
      if (get().page - 1 === 0) {
        get().reset();
        return;
      }

      set((state) => {
        return {
          page: state.page - 1,
          ...runPageChecks(state.page - 1),
        };
      });
    },
    isPrevClickable: false,
    setPage: (idx) => set({ page: idx, ...runPageChecks(idx) }),
    isLastPage: false,

    isEditing: false,
    setIsEditing: (b) => set({ isEditing: b }),
    reset: () => {
      set({
        restaurantData: initialState,
        googleLink: "",
        page: 0,
        ...runPageChecks(0),
      });
    },

    buttonText: "Dalej",

    googleLink: "",
    setGoogleLink: (link) => set({ googleLink: link }),
  };
});
