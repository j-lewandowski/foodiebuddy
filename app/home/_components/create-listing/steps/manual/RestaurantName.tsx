"use client";
import Input from "@/app/_components/Input";
import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { ChangeEvent, useState } from "react";
import { useCreateListingModal } from "@/zustand/stores/create-listing-modal/useCreateListingModal";

const RestaurantName = () => {
  const { restaurantData, setRestaurantData } = useForm();
  const [error, setError] = useState<string>("");
  const { setCanContinue, next } = useCreateListingModal();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCanContinue(e.target.value.length > 0);
    setError("");
    setRestaurantData({
      ...restaurantData,
      name: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (restaurantData.name.length === 0) {
      setError("Musisz podać nazwę knajpy");
      return;
    }
    next();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-bold text-2xl mb-4">Jak nazywa się knajpa?</span>
      <form className="w-[60%]" onSubmit={onSubmit}>
        <Input
          id="name"
          placeholder="Nazwa knajpy"
          type="text"
          onChange={onChange}
          value={restaurantData.name}
          error={error}
        />
      </form>
    </div>
  );
};

export default RestaurantName;
