"use client";
import { RATINGS } from "@/constants";
import { useRating } from "@/hooks/useRating";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import { twMerge } from "tailwind-merge";

const RatingSelector = ({ disabled }: { disabled: boolean }) => {
  const { rating, setValue } = useRestaurantForm();

  return (
    <>
      <span className="text-3xl mb-4">Wybierz tier</span>
      <div className="w-full flex items-center justify-between">
        {RATINGS.map((r, i) => (
          <div
            key={r.tier}
            className={twMerge(
              "flex items-center justify-center bg-dark-blue aspect-square w-12 p-2 rounded-full text-white text-xl duration-150",
              rating === r.value && "bg-dark-ash"
            )}
            onClick={() => {
              if (!disabled) setValue({ name: "rating", value: r.value });
            }}
          >
            <span>{r.tier}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default RatingSelector;
