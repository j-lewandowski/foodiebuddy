"use client";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Drawer from "./_components/Drawer";
import { FaPlus } from "react-icons/fa6";
import CreateListingModal from "./_components/create-listing/CreateListingModal";
import { useCreateListingModal } from "@/zustand/stores/create-listing-modal/useCreateListingModal";
import { useDrawer } from "@/zustand/stores/drawer/useDrawerStore";
import { useEffect } from "react";
import { useUser } from "@/zustand/stores/application/useUser";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const modal = useCreateListingModal();
  const drawer = useDrawer();
  const { data, status } = useSession();

  const { setUserId, setRankingId } = useUser();

  useEffect(() => {
    if (data) {
      setUserId(data.user.userId);
      setRankingId(data.user.userId);
    }
  }, [data]);

  if (!isLoaded) return <div>Loading....</div>;

  return (
    <div className="w-full h-screen pt-16">
      <div className="w-full h-full relative">
        <GoogleMap
          zoom={6}
          center={{ lat: 52, lng: 20 }}
          mapContainerClassName="map"
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            margin: "auto",
          }}
          options={{
            disableDefaultUI: true,
          }}
        ></GoogleMap>
        <Drawer />
        {modal.isOpen && <CreateListingModal />}
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
