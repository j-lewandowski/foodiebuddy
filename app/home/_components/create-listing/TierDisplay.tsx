"use client";

import { useEffect, useState } from "react";
import { useForm } from "@/zustand/stores/create-listing-modal/useForm";

// @TO-DO - MOVE THIS FUNCTION TO A HOOK
export const calculateTier = (rating: number) => {
  let result = "B";
  const r = rating;

  if (r >= 1 && r <= 2.0) {
    result = "F";
  } else if (r >= 2.1 && r <= 3.4) {
    result = "E";
  } else if (r >= 3.5 && r <= 4.9) {
    result = "D";
  } else if (r >= 5.0 && r <= 6.4) {
    result = "C";
  } else if (r >= 6.5 && r <= 7.9) {
    result = "B";
  } else if (r >= 8.0 && r <= 8.9) {
    result = "A";
  } else {
    result = "S";
  }
  return result;
};

const TierDisplay = () => {
  const { restaurantData } = useForm();
  const [tierName, setTierName] = useState<string>("");

  useEffect(() => {
    setTierName(calculateTier(restaurantData.rating));
  }, [restaurantData.rating]);

  return (
    <div className="w-full flex items-center justify-center space-x-4 mt-3 mb-8">
      <div className="text-lg">
        <span className="font-semibold">Ocena:</span>
        <span className="font-bold ml-2 px-3 py-1 rounded-lg bg-secondary text-primary">
          {restaurantData.rating <= 10
            ? restaurantData.rating.toFixed(1)
            : Number(10).toFixed(1)}
        </span>
      </div>
      <span className="text-lg font-bold">=</span>
      <div className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full">
        <div className="font-bold text-lg">{tierName}</div>
      </div>
    </div>
  );
};

export default TierDisplay;
