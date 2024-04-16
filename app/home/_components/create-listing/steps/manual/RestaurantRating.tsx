import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";
import RatingInput from "../../../RatingInput";
import TierDisplay from "../../../TierDisplay";

import { FaArrowRight } from "react-icons/fa6";

import IconButton from "@/app/_components/IconButton";

const RestaurantRating = () => {
  const { canContinue, next } = useCreateListingModalWrapper();

  return (
    <div className="w-full h-full flex flex-col items-center justify-start mt-16">
      <span className="font-bold text-2xl mb-2">Jak oceniasz knajpę?</span>
      <p className="w-[70%] text-center text-md font-normal text-neutral-500 mb-4">
        Oceń knajpę od <span className="font-bold text-black">1.0</span> do{" "}
        <span className="font-bold text-black">10.0</span> za pomocą suwaka. Po
        kliknięciu na przycisk obok suwaka, możesz też dostosować wartości
        dziesiętne oceny.
      </p>

      <TierDisplay />

      <RatingInput />

      <IconButton className="mt-4" visible={canContinue} onClick={next}>
        <FaArrowRight className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default RestaurantRating;
