"use client";
import Button3D from "@/app/_components/Button3D";
import { useDrawer } from "@/zustand/stores/drawer/useDrawerStore";
import { FaXmark } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import TierListing from "./TierListing";
import { useUser } from "@/zustand/stores/application/useUser";
import RestaurantList from "./RestaurantList";

const Drawer = () => {
  const { close, open, isOpen } = useDrawer();
  const { selectedTier } = useUser();

  return (
    <div
      className={twMerge(
        "z-10 w-[380px]  h-[70%] bg-white absolute top-[50%] -translate-y-[50%] left-0 rounded-r-lg shadow-xl p-2 py-6 duration-200",
        !isOpen && " -translate-x-[100%]"
      )}
    >
      <div className="w-full h-full flex flex-col justify-start items-center relative">
        <FaXmark
          className="absolute -top-3 right-1 h-6 w-6 hover:cursor-pointer text-primary"
          onClick={close}
        />

        {selectedTier === "ALL" ? <TierListing /> : <RestaurantList />}
      </div>

      {!isOpen && (
        <div
          className="relative h-full flex hover:cursor-pointer"
          onClick={open}
        >
          <div className="h-16 w-8 absolute bg-primary -top-[50%] -translate-y-[50%] left-[100%] rounded-r-lg">
            <div className="flex w-full h-full items-center justify-center">
              <div className="h-8 w-2 bg-secondary rounded-full translate-x-1"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drawer;
