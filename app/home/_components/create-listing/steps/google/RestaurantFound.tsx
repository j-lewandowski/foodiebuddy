"use client";
import { useCreateListingModal } from "@/zustand/stores/create-listing-modal/useCreateListingModal";
import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const RestaurantFound = () => {
  const { setPage, googleLink, setFlowType } = useCreateListingModal();
  const { restaurantData, setRestaurantData } = useForm();
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/google/get-place-from-link",
        {
          method: "POST",
          body: JSON.stringify({
            googleLink,
          }),
        }
      );
      setIsSuccess(res.ok);
      if (res.ok) {
        const data = await res.json();
        setRestaurantData({
          ...restaurantData,
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
          name: data.name,
        });
      }

      return res.ok;
    } catch (error) {
      console.log(error);
    }
    setIsSuccess(false);
    return false;
  };

  const findRestaurant = async () => {
    const found = await getData();
    setIsLoading(false);
    setTimeout(() => {
      if (found) {
        setFlowType("manual");
        setPage(2);
      } else {
        setPage(0);
      }
    }, 5000);
  };

  useEffect(() => {
    findRestaurant();
  }, []);

  // @TODO - Loading state

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={twMerge(
        `w-full h-full flex items-center justify-center flex-col`,
        isSuccess ? "text-green-500" : "text-rose-500"
      )}
    >
      {isSuccess ? (
        <FiCheckCircle className="w-64 h-64"></FiCheckCircle>
      ) : (
        <FiXCircle className="w-64 h-64" />
      )}
      <p className="font-bold text-4xl mt-12">
        {isSuccess ? "Znaleziono knajpę" : "Nie znaleziono knajpy"}
      </p>
    </div>
  );
};

export default RestaurantFound;
