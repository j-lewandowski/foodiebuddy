import Button from "@/components/Button";
import { Restaurant } from "@prisma/client";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div className="text-2xl aspect-4/5 w-full border-4 border-dark-ash rounded-lg flex flex-col items-center justify-start p-1 bg-white">
      <div
        className="bg-cover w-full h-[70%] bg-center border-2 border-dark-blue rounded-lg"
        style={{
          backgroundImage: `url('${restaurant.image}')`,
        }}
      ></div>
      <span className="flex-1 text-3xl">{restaurant.name}</span>

      <Button
        styles="w-full flex justify-center items-center gap-x-4 mb-2 mt-4"
        variant="blue"
        href={`/restaurants/${restaurant.id}`}
      >
        Zobacz więcej
      </Button>
      <Button
        styles="w-full flex justify-center items-center gap-x-4"
        variant="dark"
        href={restaurant.googleMapsLink || "https://www.google.pl/maps"}
      >
        <BsGoogle />
        <span>Link w Google</span>
      </Button>
    </div>
  );
};

export default RestaurantCard;
