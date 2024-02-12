import { Restaurant } from "@prisma/client";
import Link from "next/link";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="text-2xl aspect-4/5 w-full border-4 border-baby-blue rounded-lg flex flex-col items-center justify-start p-1 bg-white"
    >
      <div
        className="bg-cover w-full h-[70%] bg-center border-2 border-dark-blue rounded-lg"
        style={{
          backgroundImage: `url('${restaurant.image}')`,
        }}
      ></div>
      <span className="flex-1 text-3xl">{restaurant.name}</span>
    </Link>
  );
};

export default RestaurantCard;
