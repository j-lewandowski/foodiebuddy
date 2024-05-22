"use client";

import { useUser } from "@/zustand/stores/application/useUser";
import RestaurantCard from "./RestaurantCard";

const RestaurantList = () => {
  const { restaurants } = useUser();

  return (
    <>
      <span className="text-xl font-bold">Wybierz knajpę</span>
      <div className="w-full h-full overflow-auto flex flex-col items-center mt-8 space-y-6 py-4 px-3">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} details={restaurant} />
        ))}
      </div>
    </>
  );
};

export default RestaurantList;
