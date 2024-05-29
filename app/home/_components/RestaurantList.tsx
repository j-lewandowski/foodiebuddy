"use client";

import { useFilters } from "@/zustand/stores/application/useFilters";
import RestaurantCard from "./RestaurantCard";
import { useRestaurants } from "@/zustand/stores/application/useRestaurants";
import { getTierName } from "@/utils/getTierName";

const RestaurantList = () => {
  const { restaurants } = useRestaurants();
  const { rankingFilter } = useFilters();

  return (
    <>
      <span className="text-xl font-bold">Wybierz knajpę</span>
      <div className="w-full h-full overflow-auto flex flex-col items-center mt-8 space-y-6 py-4 px-3">
        {restaurants
          .filter((r) => {
            if (rankingFilter) {
              return rankingFilter === getTierName(r.rating);
            }
            return true;
          })
          .map((restaurant) => (
            <RestaurantCard key={restaurant.id} details={restaurant} />
          ))}
      </div>
    </>
  );
};

export default RestaurantList;
