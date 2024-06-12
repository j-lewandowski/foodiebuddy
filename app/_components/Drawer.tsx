"use client";
import { useDrawer } from "@/zustand/stores/drawer/useDrawerStore";
import { FaArrowLeft, FaXmark } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import TierListing from "../map/_components/TierListing";
import RestaurantList from "../map/_components/RestaurantList";
import { useFilters } from "@/zustand/stores/application/filtersStore";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

const Drawer = ({ children }: { children: ReactNode }) => {
  const { close, open, isOpen } = useDrawer();
  const { setRankingFilter, rankingFilter } = useFilters();
  const router = useRouter();
  const path = usePathname();

  return (
    <div
      className={twMerge(
        "z-10 md:w-[25%] md:max-w-[380px] w-full h-screen md:h-[70%] bg-white absolute top-0 md:top-[50%] md:-translate-y-[50%] md:left-[.5rem] rounded-lg shadow-xl p-2 md:py-6 duration-200 border-2 border-black/10 py-16",
        !isOpen && " md:-translate-x-[100%] translate-y-[90%]"
      )}
    >
      <div className="w-full flex justify-between items-center px-2 ">
        <FaArrowLeft
          className={twMerge(
            "h-8 w-8 md:h-6 md:w-6 hover:cursor-pointer text-primary",
            path === "/map" && "opacity-0 pointer-events-none"
          )}
          onClick={() => router.back()}
        />
        <FaXmark
          className="w-8 h-8 md:h-6 md:w-6 hover:cursor-pointer text-primary"
          onClick={close}
        />
      </div>

      <div className="w-full h-full flex flex-col items-center py-8">
        {children}
      </div>

      {!isOpen && (
        <>
          <div
            className="relative h-full md:flex hover:cursor-pointer hidden"
            onClick={open}
          >
            <div className="h-16 w-8 absolute bg-primary -top-[50%] -translate-y-[50%] left-[100%] rounded-r-lg">
              <div className="flex w-full h-full items-center justify-center">
                <div className="h-8 w-2 bg-secondary rounded-full translate-x-1"></div>
              </div>
            </div>
          </div>
          <div
            className="md:hidden block h-2 w-[30%] rounded-lg absolute bg-primary top-2 left-[50%] -translate-x-[50%]"
            onClick={open}
          ></div>
        </>
      )}
    </div>
  );
};

export default Drawer;
