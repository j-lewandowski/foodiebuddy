"use client";

import { useFilters } from "@/zustand/stores/application/filtersStore";
import RestaurantCard from "./RestaurantCard";
import { useRestaurants } from "@/zustand/stores/application/restaurantsStore";
import { getTierName } from "@/utils/getTierName";

const RestaurantList = () => {
  const { restaurants } = useRestaurants();
  const { rankingFilter } = useFilters();

  return (
    <>
      <span className="md:text-xl text-2xl font-bold">Wybierz knajpę</span>
      <div className="w-full h-full overflow-auto flex flex-col items-center mt-4 md:mt-8 space-y-6 py-4 px-3">
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
