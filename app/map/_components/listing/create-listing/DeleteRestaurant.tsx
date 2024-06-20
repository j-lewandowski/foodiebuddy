"use client";
import Button from "@/app/_components/Button";
import React from "react";
import { useModal } from "@/zustand/stores/create-listing-modal/modalStore";
import { useRestaurants } from "@/zustand/stores/application/restaurantsStore";

const DeleteRestaurant = () => {
  const { close } = useModal();
  const { selectedRestaurant } = useRestaurants();

  const onDelete = async () => {
    try {
      await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/restaurants?restaurantId=${selectedRestaurant!.id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
    close();
  };

  return (
    <div className="w-[450px] h-[300px] bg-white z-50 absolute rounded-lg flex flex-col items-center justify-center px-4">
      <span className="text-xl font-bold w-full text-center">
        Czy na pewno chcesz <strong>usunąć</strong> knajpę?
      </span>
      <div className="w-full gap-x-4 flex items-center justify-center mt-6 font-semibold">
        <Button variant="dark" className="w-32" onClick={close}>
          Nie
        </Button>
        <Button
          className="bg-rose-500 w-32 hover:bg-rose-500/80"
          onClick={onDelete}
        >
          Tak
        </Button>
      </div>
    </div>
  );
};

export default DeleteRestaurant;
