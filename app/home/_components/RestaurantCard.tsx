"use client";
import { useRestaurants } from "@/zustand/stores/application/useRestaurants";
import { Restaurant } from "@prisma/client";
import { FaStar } from "react-icons/fa6";
import { IoNavigate } from "react-icons/io5";

const RestaurantCard = ({ details }: { details: Restaurant }) => {
  const { setSelectedRestaurant } = useRestaurants();
  return (
    <div
      className="w-full px-1 flex flex-col justify-center items-center rounded-lg border-2 border-black/10 hover:scale-105 hover:shadow-xl transition-all duration-150 hover:cursor-pointer"
      onClick={() => {
        setSelectedRestaurant(details);
      }}
    >
      <span className="w-full py-2 text-center text-xl font-semibold text-black">
        {details.name}
      </span>
      <div className="w-full py-2 flex items-center justify-between divide-x-2 space-x-2">
        <div className="bg-primary rounded-lg text-white text-center font-semibold text-base w-full flex items-center justify-center">
          <FaStar className="mr-2" />
          <span>{details.rating.toFixed(1)}</span>
        </div>

        <div className="text-neutral-500 font-semibold text-base flex items-center justify-center w-full">
          <IoNavigate className="mr-2 h-4 w-4" />
          <span>{details.location}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
