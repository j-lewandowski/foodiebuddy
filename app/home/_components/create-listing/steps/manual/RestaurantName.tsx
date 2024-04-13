"use client";
import IconButton from "@/app/_components/IconButton";
import Input from "@/app/_components/Input";
import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";
import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { ChangeEvent, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const RestaurantName = () => {
  const { restaurantData, setRestaurantData } = useForm();
  const [error, setError] = useState<string>("");
  const { canContinue, setCanContinue, next } = useCreateListingModalWrapper();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCanContinue(e.target.value.length > 0);
    setError("");
    setRestaurantData({
      ...restaurantData,
      name: e.target.value,
    });
  };

  const onSubmit = () => {
    if (restaurantData.name.length === 0) {
      setError("Musisz podać nazwę knajpy");
      return;
    }
    next();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-bold text-2xl mb-4">Jak nazywa się knajpa?</span>
      <div className="w-[60%]">
        <Input
          id="name"
          placeholder="Nazwa knajpy"
          type="text"
          onChange={onChange}
          value={restaurantData.name}
          error={error}
        />
      </div>
      <IconButton className="mt-4" visible={canContinue} onClick={onSubmit}>
        <FaArrowRight className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default RestaurantName;
