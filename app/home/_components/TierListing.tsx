"use client";

import Button3D from "@/app/_components/Button3D";
import { useUser } from "@/zustand/stores/application/useUser";
import React from "react";

const TierListing = () => {
  const { setSelectedTier } = useUser();
  const onClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ) => {
    const target = e.target as HTMLButtonElement | HTMLSpanElement;
    setSelectedTier(
      target.id as "ALL" | "S" | "A" | "B" | "C" | "D" | "E" | "F"
    );
  };

  return (
    <>
      <span className="text-xl font-bold">Wybierz klasę</span>
      <p className="w-full text-center mt-2 font-medium text-primary">
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
