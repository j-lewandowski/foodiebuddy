import Button from "@/components/Button";
import { RATINGS } from "@/constants";
import { Restaurant } from "@prisma/client";
import { MdLocationPin } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";
import Map from "@/app/(application)/(forms)/_components/Map";

const RestaurantPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(
    process.env.NEXTURL + "/api/restaurants/restaurant?id=" + params.id,
    {
      cache: "no-store",
    }
  );
  const restaurant = (await res.json()) as Restaurant;

  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <span className="text-3xl mb-4">{restaurant.name}</span>
      <div
        className="bg-cover bg-center rounded-lg w-full aspect-video border-4 border-dark-blue relative"
        style={{ backgroundImage: `url('${restaurant.image}')` }}
      >
        <div className="absolute aspect-square w-20 bg-baby-blue rounded-full flex items-center justify-center text-4xl -left-4 -top-4">
          {RATINGS[restaurant.rating].tier}
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        <div className="w-full flex items-center justify-start">
          <MdLocationPin className="w-12 h-auto aspect-square" />
          <span className="text-xl">{restaurant.city}</span>
        </div>
        <Button styles="flex w-auto justify-center items-center gap-x-4">
          <BsGoogle />
          <span>Google maps</span>
        </Button>
      </div>

      <Map center={restaurant.coords} />
    </div>
  );
};

export default RestaurantPage;
