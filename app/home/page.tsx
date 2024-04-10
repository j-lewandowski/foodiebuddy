"use client";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Drawer from "./_components/Drawer";

const HomePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

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
      </div>
    </div>
  );
};

export default HomePage;
