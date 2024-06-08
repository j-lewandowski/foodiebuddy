"use client";
import Button from "@/app/_components/Button";
import { FaGoogle } from "react-icons/fa6";
import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import Google from "next-auth/providers/google";

const Decision = () => {
  const { setFormInputs } = useForm();
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <span className="font-bold text-2xl text-center w-full">
          W jaki sposób chcesz dodać knajpę?
        </span>
        <p className="w-[80%] text-center mt-6 font-semibold text-neutral-500">
          Możesz zrobić to za pomocą linku do wizytówki Google lub wprowadzić
          potrzebne dane ręcznie.
        </p>

        <div className="w-full md:h-full flex flex-col items-center justify-center space-y-8 md:-mt-20">
          <Button
            variant="dark"
            className="w-[200px] h-16 flex items-center justify-center text-2xl font-semibold"
            onClick={() => {
              setFormInputs("GOOGLE", 1);
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
              setFormInputs("MANUAL", 1);
            }}
            variant="light"
            className="w-[200px] h-16 flex items-center justify-around text-2xl font-semibold"
          >
            Ręcznie
          </Button>
        </div>
      </div>
    </>
  );
};

export default Decision;
