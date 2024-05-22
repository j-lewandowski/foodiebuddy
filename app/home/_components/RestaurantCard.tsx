"use client";
import { useUser } from "@/zustand/stores/application/useUser";
import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { Restaurant } from "@prisma/client";

const RestaurantCard = ({ details }: { details: Restaurant }) => {
  const { setSelectedRestaurant } = useUser();
  const { setRestaurantData } = useForm();
  return (
    <div
      className="w-full aspect-square h-auto rounded-lg border-2 border-black/10 hover:scale-105 hover:shadow-xl transition-all duration-150 hover:cursor-pointer"
      onClick={() => {
        setRestaurantData({
          name: details.name,
          rating: details.rating,
          recommendedFood: details.recommendedFood,
          lat: details.lat,
          lng: details.lng,
        });
        setSelectedRestaurant(details);
      }}
    >
      <div
        style={{ backgroundImage: `url('${details.image}')` }}
        className="w-full aspect-square h-3/4 rounded-t-lg bg-cover bg-center"
      ></div>
      <div className="w-full flex items-center justify-between px-3 text-xl font-bold mt-4">
        <p>{details.name}</p>
        <span className="p-2 bg-primary rounded-lg text-white font-medium">
          Ocena - {details.rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default RestaurantCard;
