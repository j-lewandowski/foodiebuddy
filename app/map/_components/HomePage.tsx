"use client";
import { FaPlus } from "react-icons/fa6";
import { useModal } from "@/zustand/stores/create-listing-modal/modalStore";
import { useDrawer } from "@/zustand/stores/drawer/useDrawerStore";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/zustand/stores/application/userStore";
import { useSession } from "next-auth/react";
import RestaurantDetailsCard from "./RestaurantDetailsCard";
import { useRestaurants } from "@/zustand/stores/application/restaurantsStore";
import Modal from "./Modal";
import MultistepForm from "./create-listing/MultistepForm";
import Mainmap from "./maps/Mainmap";

const HomePage = () => {
  const modal = useModal();
  const drawer = useDrawer();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const { setUserId, rankingId, setRankingId } = useUser();
  const { restaurants, setRestaurants, selectedRestaurant } = useRestaurants();

  useEffect(() => {
    if (data) {
      setUserId(data.user.userId);
      setRankingId(data.user.userId);
    }
    setIsLoading(false);
  }, [data]);

  // @TODO - add loader
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full h-screen pt-16">
      <div className="w-full h-full relative">
        <Mainmap />

        {/* <Drawer /> */}
        {selectedRestaurant && <RestaurantDetailsCard />}
        {modal.isOpen && (
          <Modal>
            <MultistepForm />
          </Modal>
        )}
        <div
          onClick={() => {
            modal.open();
            drawer.close();
          }}
          className="absolute bottom-6 right-6 bg-secondary h-16 w-16 rounded-full ease-in-out flex items-center justify-center shadow-lg duration-200 group hover:w-fit hover:px-4 hover:py-2 hover:cursor-pointer"
        >
          <FaPlus className="h-8 w-8 text-primary group-hover:h-6 group-hover:w-6" />
          <span className="hidden group-hover:block font-bold text-primary ml-3">
            Dodaj knajpę
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
