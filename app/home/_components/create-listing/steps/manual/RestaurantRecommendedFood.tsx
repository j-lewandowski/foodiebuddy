import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";
import IconButton from "@/app/_components/IconButton";
import RecommendedFood from "../../../RecommendedFood";
import { FaArrowRight } from "react-icons/fa6";

const RestaurantRecommendedFood = () => {
  const { canContinue, next } = useCreateListingModalWrapper();

  return (
    <div className="w-full h-full flex flex-col items-center justify-start mt-16">
      <span className="font-bold text-2xl">
        Które pozycje z karty polecasz?
      </span>
      <span className="text-md font-semibold mb-4">(opcjonalnie)</span>
      <p className="w-[70%] text-center text-md font-normal text-neutral-500 mb-4">
        Możesz tutaj dodać polecane przez Ciebie pozycje z menu knajpy. Ten krok
        jest opcjonalny. Zawsze możesz też dodać lub usunąć pozycje później.
      </p>

      <RecommendedFood></RecommendedFood>

      <IconButton className="mt-4" visible={canContinue} onClick={next}>
        <FaArrowRight className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default RestaurantRecommendedFood;
