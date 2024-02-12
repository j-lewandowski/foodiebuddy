import { Restaurant } from "@prisma/client";

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
          {restaurant.rating}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
