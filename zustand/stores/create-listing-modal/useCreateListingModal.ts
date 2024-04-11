import { create } from "zustand";
import { useForm } from "./useForm";

interface CreateListingModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateListingModal = create<CreateListingModalStore>()(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => {
      set({ isOpen: false });
    },
  })
);
