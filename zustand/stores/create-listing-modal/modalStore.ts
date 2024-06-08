import { create } from "zustand";
import { useForm } from "./formStore";

interface ModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useModal = create<ModalStore>()((set, state) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
    useForm.getState().reset();
  },
}));
