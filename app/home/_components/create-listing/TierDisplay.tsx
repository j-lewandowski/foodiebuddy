"use client";

import { useEffect, useState } from "react";
import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { getTierName } from "@/utils/getTierName";

const TierDisplay = () => {
  const { restaurantData } = useForm();
  const [tierName, setTierName] = useState<string>("");

  useEffect(() => {
    setTierName(getTierName(restaurantData.rating));
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
