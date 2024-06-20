import Link from "next/link";
import { FaList, FaUser } from "react-icons/fa6";

interface RankingItemProps {
  rankingData: {
    id: string;
    name: string;
    restaurantsCount: number;
    usersCount: number;
  };
}

const RankingItem = ({ rankingData }: RankingItemProps) => {
  return (
    <Link
      href={"/map/" + rankingData.id}
      className="w-full px-2 py-3 border-2 border-black rounded-lg flex items-center justify-center text-neutral-500 flex-col gap-2"
    >
      <span className="text-xl font-bold text-black">{rankingData.name}</span>
      <div className="flex divide-x-2 w-full">
        <div className="flex items-center justify-center font-semibold w-full">
          <FaUser />
          <span className="text-lg ml-2">{rankingData.usersCount}</span>
        </div>
        <div className="flex items-center justify-center font-semibold w-full">
          <FaList />
          <span className="text-lg ml-2">{rankingData.restaurantsCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default RankingItem;
