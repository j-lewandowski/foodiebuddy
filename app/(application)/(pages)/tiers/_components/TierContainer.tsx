import Link from "next/link";

const TierContainer = ({ tier }: { tier: string }) => {
  return (
    <Link
      href={`/tiers/${tier}`}
      className="w-full text-center h-20 flex items-center justify-center bg-dark-ash rounded-lg"
    >
      <span className="flex w-full h-full bg-ash -translate-y-3 rounded-lg items-center justify-center active:-translate-y-1 duration-150">
        {tier}
      </span>
    </Link>
  );
};

export default TierContainer;
