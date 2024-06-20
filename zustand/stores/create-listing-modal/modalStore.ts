import { create } from "zustand";
import MultistepForm from "@/app/map/_components/listing/create-listing/MultistepForm";
import SignOut from "@/app/_components/SignOut";
import DeleteRestaurant from "@/app/map/_components/listing/create-listing/DeleteRestaurant";
import { useForm } from "./formStore";

interface ModalStore {
  isOpen: boolean;
  window: (() => JSX.Element) | null;
  setWindow: (window: WindowsTypes | null) => void;
  open: () => void;
  close: () => void;
}

export enum WindowsTypes {
  MultistepForm = "MultistepForm",
  SignOut = "SignOut",
  DeleteRestaurant = "DeleteRestaurant",
}

const windows = {
  [WindowsTypes.MultistepForm]: MultistepForm,
  [WindowsTypes.SignOut]: SignOut,
  [WindowsTypes.DeleteRestaurant]: DeleteRestaurant,
};

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  window: null,
  open: () => set({ isOpen: true }),
  close: () => {
    set({ isOpen: false, window: null });
    useForm.getState().reset();
  },
  setWindow: (window: WindowsTypes | null) => {
    if (window === null) {
      set({ window: null });
    } else {
      set({ window: windows[window], isOpen: true });
    }
  },
}));
