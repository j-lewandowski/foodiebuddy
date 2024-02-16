import { RATINGS } from "@/constants";
import { Restaurant } from "@prisma/client";

import { twMerge } from "tailwind-merge";
import { MdLocationPin } from "react-icons/md";

import Map from "@/app/_components/Map";
import DeleteButton from "../_components/DeleteButton";

const RestaurantPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    process.env.NEXTURL + "/api/restaurants/restaurant?id=" + params.id,
    {
      cache: "no-store",
    }
  );
  const restaurant = (await res.json()) as Restaurant;

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 gap-y-4 pb-8 relative">
      <div className="flex items-center justify-between w-full text-center mb-4">
        <div className="block h-8 w-8"></div>
        <span className="text-3xl text-centerk justify-center">
          {restaurant.name}
        </span>
        <DeleteButton id={restaurant.id} />
      </div>

      <div
        className="bg-cover bg-center rounded-lg w-full aspect-video border-4 border-dark-blue relative"
        style={{ backgroundImage: `url('${restaurant.image}')` }}
      >
        <div className="absolute aspect-square w-20 bg-baby-blue rounded-full flex items-center justify-center text-4xl -left-4 -top-4">
          {RATINGS[restaurant.rating].tier}
        </div>
      </div>

      {restaurant.recommendedFood.length > 0 && (
        <div className="flex flex-col w-full items-center justify-center">
          <span className="text-3xl bg-baby-blue/45 w-full p-2 border-2 border-baby-blue rounded-t-lg text-center">
            Polecane pozycje
          </span>
          <div className="w-full flex flex-col gapy-0">
            {restaurant.recommendedFood.map((f, i) => (
              <div
                className={twMerge(
                  "bg-baby-blue/45 w-full p-2 text-2xl border-2 border-t-0 border-baby-blue animate-slideUpFood flex items-center justify-between px-4",
                  i === restaurant.recommendedFood.length - 1 && "rounded-b-lg"
                )}
                key={i}
              >
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Map center={restaurant.coords} />
      <div className="w-full flex items-center justify-between mt-4">
        <div className="w-full flex items-center justify-start">
          <MdLocationPin className="w-12 h-auto aspect-square" />
          <span className="text-xl">{restaurant.city}</span>
        </div>
      </div>

      <button></button>
    </div>
  );
};

export default RestaurantPage;
