"use client";

import Button3D from "@/app/_components/Button3D";
import { useFilters } from "@/zustand/stores/application/filtersStore";
import { useRouter } from "next/navigation";
import React from "react";

const TierListing = () => {
  const { setRankingFilter } = useFilters();
  const router = useRouter();
  const onClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ) => {
    const target = e.target as HTMLButtonElement | HTMLSpanElement;
    // setRankingFilter(target.id);
    router.push(`/map/${target.id}`);
  };

  return (
    <>
      <span className="md:text-xl text-2xl font-bold">Wybierz klasę</span>
      <p className="w-full text-center mt-2 font-medium text-xl md:text-base text-primary">
        Wybierz klasę knajp, które mam wyświetlić
      </p>
      <div className="w-full h-full overflow-auto flex flex-col items-center mt-8 space-y-6 py-4">
        <div className="w-full h-full">
          <Button3D onClick={onClick} id="S">
            S
          </Button3D>
        </div>
        <div className="w-full h-full">
          <Button3D onClick={onClick} id="A">
            A
          </Button3D>
        </div>
        <div className="w-full h-full">
          <Button3D onClick={onClick} id="B">
            B
          </Button3D>
        </div>
        <div className="w-full h-full">
          <Button3D onClick={onClick} id="C">
            C
          </Button3D>
        </div>
        <div className="w-full h-full">
          <Button3D onClick={onClick} id="D">
            D
          </Button3D>
        </div>
        <div className="w-full h-full">
          <Button3D onClick={onClick} id="E">
            E
          </Button3D>
        </div>
        <div className="w-full h-full">
          <Button3D onClick={onClick} id="F">
            F
          </Button3D>
        </div>
      </div>
    </>
  );
};

export default TierListing;
