"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";

import ImagePicker from "../_components/ImagePicker";
import RatingSelector from "../_components/RatingSelector";
import LocationPicker from "../_components/LocationPicker";
import RecommendedItems from "../_components/RecommendedItems";

import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddRestaurantPage = () => {
  const {
    name,
    image,
    rating,
    coords,
    googleMapsLink,
    city,
    recommendedFood,
    setValue,
  } = useRestaurantForm();
  const { setToast } = useToast();
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    setIsPending(true);
    if (!image) {
      setToast("Musisz dodać zdjęcie", false);
      setIsPending(false);
      return;
    }

    if (!name) {
      setToast("Musisz dodać nazwę knajpy", false);
      setIsPending(false);
      return;
    }

    const formData = new FormData();

    const blob = await fetch(image).then((r) => r.blob());
    const dataToSend = {
      name,
      rating,
      city,
      coords,
      googleMapsLink,
      recommendedFood,
    };

    formData.append("image", blob);
    formData.append("data", JSON.stringify(dataToSend));

    const res = await fetch("/api/restaurants", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data.status === 201) {
      setToast("Dodano knajpę!", true);
      router.push("/");
    } else {
      setToast("Wystąpił błąd!", false);
    }
    setIsPending(false);
  };

  return (
    <div className="w-full min-h-full py-36 px-4 md:px-8 flex flex-col items-center justify-center relative space-y-5">
      <span className="text-3xl border-b-2 border-b-black w-full text-center py-4">
        Dodaj knajpę
      </span>

      <ImagePicker disabled={isPending} />
      <Input
        placeholder="Nazwa knajpy"
        id="name"
        onChange={(e) => setValue({ name: "name", value: e.target.value })}
        disabled={isPending}
      />

      <RatingSelector disabled={isPending} />

      <RecommendedItems />

      <LocationPicker />

      <Button
        styles="w-80 h-16 text-3xl absolute shadow-lg bottom-8"
        onClick={onSubmit}
        disabled={isPending}
      >
        Dodaj
      </Button>
    </div>
  );
};

export default AddRestaurantPage;
