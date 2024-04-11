"use client";
import Button from "@/app/_components/Button";

import { FaGoogle } from "react-icons/fa6";
import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";

const Decision = () => {
  const { setFlowType, next } = useCreateListingModalWrapper();

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <span className="font-bold text-2xl">
          W jaki sposób chcesz dodać knajpę?
        </span>
        <p className="w-[80%] text-center mt-6 font-semibold text-neutral-500">
          Możesz zrobić to za pomocą linku do wizytówki Google lub wprowadzić
          potrzebne dane ręcznie.
        </p>

        <div className="w-full h-full flex flex-col items-center justify-center space-y-8 -mt-20">
          <Button
            variant="dark"
            className="w-[200px] flex items-center justify-center text-xl font-semibold"
            onClick={() => {
              setFlowType("google");
              next();
            }}
          >
            <FaGoogle className="mr-6" />
            Google
          </Button>
          <div className="w-[70%] h-[2px] bg-black/10 flex items-center justify-center">
            <span className="bg-white px-3 font-bold text-lg">LUB</span>
          </div>
          <Button
            onClick={() => {
              setFlowType("manual");
              next();
            }}
            variant="light"
            className="w-[200px] flex items-center justify-around text-xl font-semibold"
          >
            Ręcznie
          </Button>
        </div>
      </div>
    </>
  );
};

export default Decision;
