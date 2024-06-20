"use client";
import { FaPlus } from "react-icons/fa6";
import RankingItem from "./_components/ranking/RankingItem";
import { useEffect, useState } from "react";
import { useUser } from "@/zustand/stores/application/userStore";
import { Ranking } from "@prisma/client";

interface RankingData extends Ranking {
  usersCount: number;
  restaurantsCount: number;
}

const RankingsPage = () => {
  const [rankings, setRankings] = useState<RankingData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/rankings`
      );
      const data = await res.json();
      setRankings(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <span className="md:text-xl text-2xl font-bold">Wybierz Ranking</span>
      <p className="w-full text-center mt-2 font-medium text-xl md:text-base text-primary">
        Wybierz ranking, które chcesz zobaczyć
      </p>
      <div className="w-full h-full overflow-auto flex flex-col items-center mt-8 space-y-6 py-4">
        <div className="w-full px-2 py-3 border-dashed border-2 rounded-lg flex items-center justify-center text-neutral-500">
          <FaPlus className="h-8 w-8" />
          <span className="text-xl font-semibold ml-4">Dodaj ranking</span>
        </div>
        {rankings.map((ranking) => (
          <RankingItem key={ranking.id} rankingData={ranking} />
        ))}
        {/* <RankingItem />
        <RankingItem />
        <RankingItem /> */}
      </div>
    </>
  );
};

export default RankingsPage;
