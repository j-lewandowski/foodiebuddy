"use client";
import { useRestaurants } from "@/zustand/stores/application/useRestaurants";
import { Restaurant } from "@prisma/client";
import { IoNavigate } from "react-icons/io5";

const RestaurantCard = ({ details }: { details: Restaurant }) => {
  const { setSelectedRestaurant } = useRestaurants();
  return (
    <div
      className="w-full flex flex-col justify-start items-start aspect-square h-auto rounded-lg border-2 border-black/10 hover:scale-105 hover:shadow-xl transition-all duration-150 hover:cursor-pointer"
      onClick={() => {
        setSelectedRestaurant(details);
      }}
    >
      <div
        style={{ backgroundImage: `url('${details.image}')` }}
        className="w-full aspect-square h-2/3 rounded-t-lg bg-cover bg-center relative"
      >
        <span className="p-2 bg-primary rounded-lg text-white font-medium text-base bottom-1 right-1 absolute">
          Ocena - {details.rating.toFixed(1)}
        </span>
      </div>
      <span className="w-full flex flex-1 py-1 flex-col items-start justify-center px-3 text-xl font-semibold mt-4 text-black">
        {details.name}
      </span>
      <div className="text-neutral-500 font-bold flex items-center justify-end w-full px-2 pb-2">
        <IoNavigate className="mr-2 h-6 w-6" />
        <span>{details.location}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
