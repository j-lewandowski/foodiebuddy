import { useMobileNavbar } from "@/hooks/useMobileNavbar";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const HamburgerIcon = () => {
  const { isOpen, onClose, onOpen } = useMobileNavbar();

  const toggleOpen = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div
      onClick={toggleOpen}
      className="space-y-2 flex items-center flex-col justify-center"
    >
      <div
        className={twMerge(
          "w-12 h-2 bg-white rounded-lg",
          isOpen && "transition-all duration-300 rotate-45 translate-y-[100%]"
        )}
      ></div>
      <div
        className={twMerge(
          "w-12 h-2 bg-white rounded-lg",
          isOpen &&
            "transition-all duration-300 translate-x-full opacity-0 hidden"
        )}
      ></div>
      <div
        className={twMerge(
          "w-12 h-2 bg-white rounded-lg",
          isOpen && "transition-all duration-300 -rotate-45 -translate-y-[100%]"
        )}
      ></div>
    </div>
  );
};

export default HamburgerIcon;
