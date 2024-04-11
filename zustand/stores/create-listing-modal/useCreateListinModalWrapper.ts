import { create } from "zustand";

interface CreateListingModalWrapperStore {
  page: number;
  flowType: "google" | "manual";
  next: () => void;
  prev: () => void;
  setFlowType: (type: "google" | "manual") => void;
}

export const useCreateListingModalWrapper =
  create<CreateListingModalWrapperStore>()((set) => ({
    page: 0,
    flowType: "google",
    next: () => set((state) => ({ page: state.page + 1 })),
    prev: () => set((state) => ({ page: state.page - 1 })),
    setFlowType: (type) => set({ flowType: type }),
  }));
