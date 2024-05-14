import React from "react";
import CustomMap from "../../../CustomMap";
import { APIProvider } from "@vis.gl/react-google-maps";

const RestaurantLocation = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-bold text-2xl mb-4">
        Wybierz lokalizację knajpy
      </span>
      <div className="w-full h-full pb-4 rounded-lg">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <CustomMap variant="picker" />
        </APIProvider>
      </div>
    </div>
  );
};

export default RestaurantLocation;
