import { create } from "zustand";

interface DrawerStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useDrawerStore = create<DrawerStore>()((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
