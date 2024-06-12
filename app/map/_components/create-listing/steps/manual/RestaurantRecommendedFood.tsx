"use client";

import RecommendedFood from "../../RecommendedFood";

const RestaurantRecommendedFood = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <span className="font-bold text-2xl">
        Które pozycje z karty polecasz?
      </span>
      <span className="text-md font-semibold mb-4">(opcjonalnie)</span>
      <p className="w-[70%] text-center text-md font-normal text-neutral-500 mb-4">
        Możesz tutaj dodać polecane przez Ciebie pozycje z menu knajpy. Ten krok
        jest opcjonalny. Zawsze możesz też dodać lub usunąć pozycje później.
      </p>

      <RecommendedFood></RecommendedFood>
    </div>
  );
};

export default RestaurantRecommendedFood;
