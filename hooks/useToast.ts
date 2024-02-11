import { create } from "zustand";

type ToastStore = {
  message: string;
  isActive: boolean;
  positive: boolean | null;
  setToast: (message: string, positive: boolean) => void;
};

export const useToast = create<ToastStore>((set) => ({
  message: "",
  isActive: false,
  positive: null,
  setToast: (message, positive) => {
    set({ message, isActive: true, positive });
    setTimeout(() => {
      set({ message: "", isActive: false, positive: null });
    }, 5000);
  },
}));
