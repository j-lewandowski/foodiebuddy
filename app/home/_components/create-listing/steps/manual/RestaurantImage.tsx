import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { useRef } from "react";
import { IoFastFood } from "react-icons/io5";

const RestaurantImage = () => {
  const { restaurantData, setRestaurantData } = useForm();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange = () => {
    const files = inputRef.current?.files;
    if (!files) return;
    setRestaurantData({
      ...restaurantData,
      image: URL.createObjectURL(files[0]),
    });
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
        className="w-64 h-64 rounded-lg outline-1 outline-dashed flex items-center justify-center"
        onClick={onClick}
      >
        {restaurantData.image ? (
          <div
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('${restaurantData.image}')`,
            }}
          ></div>
        ) : (
          <IoFastFood className="h-20 w-20 text-primary"></IoFastFood>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default RestaurantImage;
