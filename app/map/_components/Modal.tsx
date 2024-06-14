"use client";

import { useModal } from "@/zustand/stores/create-listing-modal/modalStore";
import { ReactNode } from "react";

const Modal = () => {
  const { close, window } = useModal();
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <div className="relative h-full w-full">
        <div className="w-full h-full flex items-center justify-center relative">
          {window && window()}
        </div>
        <div
          className="w-full h-full absolute top-0 bg-black/50 z-60"
          onClick={() => {
            close();
          }}
        ></div>
      </div>
    </div>
  );
};

export default Modal;
