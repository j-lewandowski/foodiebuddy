import React from "react";
import Minimap from "../../../maps/Minimap";

const RestaurantLocation = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-bold text-2xl mb-4">
        Wybierz lokalizację knajpy
      </span>
      <div className="w-full h-full pb-4 rounded-lg overflow-hidden">
        <Minimap />
      </div>
    </div>
  );
};

export default RestaurantLocation;
