import { Restaurant } from "@prisma/client";
import RestaurantCard from "./_components/RestaurantCard";

const TierPage = async ({ params }: { params: { tier: string } }) => {
  const res = await fetch(
    process.env.NEXTURL + "/api/restaurants?tier=" + params.tier,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const restaurants = (await res.json()) as Restaurant[];

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center">
      <span className="text-3xl mb-6 bg-baby-blue p-2 rounded-lg text-center px-6">
        Tier - {params.tier}
      </span>
      <div className="flex flex-col items-center justify-center w-full px-2 gap-y-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default TierPage;
