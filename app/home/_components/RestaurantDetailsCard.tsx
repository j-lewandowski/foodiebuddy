"use client";

import { getTierName } from "@/utils/getTierName";
import { useRestaurants } from "@/zustand/stores/application/restaurantsStore";
import { useModal } from "@/zustand/stores/create-listing-modal/modalStore";
import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash, FaXmark } from "react-icons/fa6";

const RestaurantDetailsCard = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurants();
  const { setRestaurantData, setIsEditing, setFormInputs } = useForm();
  const { open } = useModal();

  const onDelete = async () => {
    try {
      await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/restaurants?restaurantId=${selectedRestaurant!.id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {}
  };

  const onEdit = () => {
    open();
    setFormInputs("MANUAL", 1);
    setIsEditing(true);
    setRestaurantData(selectedRestaurant!);
  };

  return (
    <div className="z-10 w-[25%] max-w-[380px]  h-[70%] bg-white absolute top-[50%] -translate-y-[50%] right-[.5rem] rounded-lg shadow-xl p-2 py-6 duration-200 border-2 border-black/10">
      <div className="w-full min-h-full h-full flex flex-col justify-start items-center relative">
        <div className="w-full h-full px-2 space-y-4 overflow-y-auto flex flex-col items-center justify-start">
          <div className="w-full text-primary flex items-center justify-between">
            <FaXmark
              className="h-6 w-6 hover:cursor-pointer"
              onClick={() => setSelectedRestaurant(null)}
            />
            <div className="flex gap-2">
              <FaTrash
                className="h-4 w-4 hover:cursor-pointer duration-150 hover:text-rose-500"
                onClick={onDelete}
              />
              <AiFillEdit
                className="h-4 w-4 hover:cursor-pointer duration-150 hover:text-secondary"
                onClick={onEdit}
              />
            </div>
          </div>
          <div className="w-full h-fit">
            <div
              className="w-full aspect-square rounded-lg bg-cover bg-center relative"
              style={{ backgroundImage: `url('${selectedRestaurant!.image}')` }}
            >
              <div className="w-12 h-12 absolute top-1 right-1 rounded-full bg-primary text-white text-center font-bold text-2xl flex items-center justify-center">
                <div>{getTierName(selectedRestaurant!.rating)}</div>
              </div>
            </div>
            <div className="mt-1 p-2 bg-secondary text-center w-full text-primary text-lg font-bold rounded-lg">
              Ocena - {selectedRestaurant!.rating}
            </div>
          </div>

          <div className="flex flex-col w-full">
            <span className="w-full h-fit font-semibold text-xl">
              {selectedRestaurant!.name}
            </span>
            <span className="w-full h-fit font-medium text-lg text-neutral-500">
              {selectedRestaurant!.location}
            </span>
          </div>

          <div className="w-full h-fit flex flex-col gap-2">
            <span className="text-lg font-semibold w-full text-center pb-0.5 border-b-2 border-black/10">
              Polecane pozycje
            </span>
            <ul className="flex flex-col items-center justify-start gap-2 text-white font-medium h-fit">
              {selectedRestaurant!.recommendedFood.map((food) => (
                <li
                  className="w-full p-2 bg-primary rounded-lg text-center h-fit"
                  key={food}
                >
                  {food}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsCard;
