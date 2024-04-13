import { create } from "zustand";
import { useForm } from "./useForm";
import { useCreateListingModalWrapper } from "./useCreateListinModalWrapper";

interface CreateListingModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateListingModal = create<CreateListingModalStore>()(
  (set) => ({
    isOpen: false,
    open: () => {
      set({ isOpen: true });
      useForm.getState().reset();
      useCreateListingModalWrapper.getState().resetPage();
    },
    close: () => {
      set({ isOpen: false });
      useForm.getState().reset();
      useCreateListingModalWrapper.getState().resetPage();
    },
  })
);
