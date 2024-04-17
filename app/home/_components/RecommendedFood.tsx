import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { twMerge } from "tailwind-merge";
import { ChangeEvent, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa6";

const RecommendedFood = () => {
  const { restaurantData, setRestaurantData } = useForm();
  const [foodInput, setFoodInput] = useState<string>("");
  const [foodList, setFoodList] = useState<string[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFoodList((prev) => {
      const list = [...prev, foodInput];
      setRestaurantData({
        ...restaurantData,
        recommendedFood: list,
      });
      return list;
    });
    setFoodInput("");
  };

  const handleDelete = (idx: number) => {
    setFoodList((prev) => {
      const list = prev.filter((food, i) => i !== idx);
      setRestaurantData({
        ...restaurantData,
        recommendedFood: list,
      });
      return list;
    });
  };

  return (
    <div className="w-[70%]">
      <div className="w-full">
        <form onSubmit={onSubmit} className="w-full h-fit relative">
          <input
            placeholder="Podaj pozycję"
            className={twMerge(
              "w-full p-2 py-3 rounded-t-lg border-t-0 border-2 border-black/10 focus:outline-none",
              foodList.length === 0 && "rounded-b-lg"
            )}
            value={foodInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFoodInput(e.target.value);
            }}
          />
          {foodInput.length > 0 && (
            <div
              className="absolute right-2 top-[50%] -translate-y-[50%] bg-secondary p-2 rounded-lg hover:cursor-pointer duration-150 shadow-lg"
              onClick={onSubmit}
            >
              <div>
                <FaCheck className="text-primary h-6 w-6" />
              </div>
            </div>
          )}
        </form>

        <div
          className={twMerge(
            "max-h-36 overflow-auto border-2 border-black/10 border-t-0 visible rounded-b-lg",
            foodList.length === 0 && "invisible"
          )}
        >
          {foodList.map((food: string, i) => (
            <div key={food} className="w-full h-fit relative">
              <div
                className={twMerge(
                  "p-2 py-3 border-2 border-t-0 border-x-0",
                  i === foodList.length - 1 && "border-b-0"
                )}
              >
                {food}
              </div>
              <div
                className="absolute right-2 top-[50%] -translate-y-[50%] bg-secondary p-2 rounded-lg hover:cursor-pointer duration-150 shadow-lg"
                onClick={() => handleDelete(i)}
              >
                <div>
                  <FaTrash className="text-primary h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedFood;
