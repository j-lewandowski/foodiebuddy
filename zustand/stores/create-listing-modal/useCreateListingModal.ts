import { create } from "zustand";
import { useForm } from "./useForm";

interface CreateListingModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;

  page: number;
  flowType: "google" | "manual";
  canContinue: boolean;
  setCanContinue: (b: boolean) => void;
  next: () => void;
  prev: () => void;
  setFlowType: (type: "google" | "manual") => void;
  setPage: (idx: number) => void;
  resetPage: () => void;

  googleLink: string;
  setGoogleLink: (link: string) => void;
}

export const useCreateListingModal = create<CreateListingModalStore>()(
  (set, state) => ({
    isOpen: false,
    open: () => {
      set({ isOpen: true });
      // useForm.getState().reset();
      useCreateListingModal.getState().resetPage();
    },
    close: () => {
      set({ isOpen: false });
      useForm.getState().reset();
      useCreateListingModal.getState().resetPage();
    },
    page: 0,
    flowType: "google",
    canContinue: false,
    next: () => set((state) => ({ page: state.page + 1 })),
    prev: () => {
      if (useCreateListingModal.getState().page - 1 === 0) {
        useForm.getState().reset();
      }
      set((state) => ({ page: state.page - 1 }));
    },
    setPage: (idx) => set({ page: idx }),
    setFlowType: (type) => set({ flowType: type }),
    setCanContinue: (bool) => set({ canContinue: bool }),
    resetPage: () => set({ page: 0, canContinue: false, googleLink: "" }),
    googleLink: "",
    setGoogleLink: (link) => set({ googleLink: link }),
  })
);
