import { create } from "zustand";

type ImageStore = {
  image: string;
  setImage: (newImage: string) => void;
};

export const useImage = create<ImageStore>((set) => ({
  image: "",
  setImage: (newImage: string) => set({ image: newImage }),
}));
