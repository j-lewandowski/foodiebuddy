import { create } from "zustand";

interface CreateListingModalWrapperStore {
  page: number;
  flowType: "google" | "manual";
  canContinue: boolean;
  setCanContinue: (b: boolean) => void;
  next: () => void;
  prev: () => void;
  setFlowType: (type: "google" | "manual") => void;
  resetPage: () => void;
}

export const useCreateListingModalWrapper =
  create<CreateListingModalWrapperStore>()((set) => ({
    page: 0,
    flowType: "google",
    canContinue: false,
    next: () => set((state) => ({ page: state.page + 1 })),
    prev: () => set((state) => ({ page: state.page - 1 })),
    setFlowType: (type) => set({ flowType: type }),
    setCanContinue: (bool) => set({ canContinue: bool }),
    resetPage: () => set({ page: 0, canContinue: false }),
  }));
