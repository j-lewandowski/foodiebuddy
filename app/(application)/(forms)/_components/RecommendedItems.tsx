import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const RecommendedItems = () => {
  const { recommendedFood, addRecommendedFood, removeRecommendedFood } =
    useRestaurantForm();

  const [food, setFood] = useState<string>("");

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <span className="text-3xl mb-4">Podaj polecane pozycje</span>
      <div className="flex flex-col items-center justif-center w-full">
        <div className="bg-baby-blue/45 w-full p-2 rounded-t-lg text-2xl border-2 border-baby-blue">
          Polecane pozycje
        </div>
        <div className="w-full flex flex-col gapy-0">
          {recommendedFood.map((f, i) => (
            <div
              className="bg-baby-blue/45 w-full p-2 text-2xl border-2 border-t-0 border-baby-blue animate-slideUpFood flex items-center justify-between px-4"
              key={i}
            >
              <span>{f}</span>
              <FaTrashAlt
                className="p-2 w-10 h-10 text-rose-500 focus:text-rose-400 hover:text-rose-400"
                onClick={() => removeRecommendedFood(i)}
              />
            </div>
          ))}
        </div>
        <div className="w-full h-fit relative">
          <input
            className="bg-baby-blue/45 w-full p-2 rounded-lg text-2xl border-2 border-t-0 border-baby-blue rounded-t-none "
            placeholder="Podaj pozycję"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          ></input>

          {food.length > 0 && (
            <Button
              styles="absolute z-15 right-2 bottom-1.5"
              onClick={() => {
                addRecommendedFood(food);
                setFood("");
              }}
              variant="dark"
            >
              Dodaj
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedItems;
