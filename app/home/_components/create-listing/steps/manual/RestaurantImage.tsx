import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import IconButton from "@/app/_components/IconButton";
import { FaArrowRight } from "react-icons/fa6";
import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";
import { useRef } from "react";

const RestaurantImage = () => {
  const { restaurantData, setRestaurantData } = useForm();
  const { canContinue } = useCreateListingModalWrapper();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputRef.current!.click();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-bold text-2xl">Wybierz zdjęcie knajpy</span>
      <span className="text-md font-semibold mb-4">(opcjonalnie)</span>
      <p className="w-[70%] text-center text-md font-normal text-neutral-500 mb-4">
        Możesz kliknąć na pole poniżej aby dodać własne zdjęcie. Ten krok jest
        opcjonalny. Jeśli nie masz pod ręką zdjęcia, możesz dodać je później.
      </p>
      <div
        className="w-64 h-64 rounded-lg outline-1 outline-dashed"
        onClick={onClick}
      ></div>

      <IconButton className="mt-6" visible={canContinue}>
        <FaArrowRight className="h-6 w-6" />
      </IconButton>
      <input ref={inputRef} type="file" className="hidden" />
    </div>
  );
};

export default RestaurantImage;
