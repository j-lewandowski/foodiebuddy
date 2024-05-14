"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  Map,
  useMap,
  AdvancedMarker,
  MapMouseEvent,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import Glyph from "@/public/images/Glyph.png";
import Image from "next/image";
import Button from "@/app/_components/Button";
import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { useCreateListingModal } from "@/zustand/stores/create-listing-modal/useCreateListingModal";

interface CustomMapProps {
  children?: ReactNode;
  variant?: "picker" | "default";
}

interface Marker {
  lat: number;
  lng: number;
  id?: string;
}

const CustomMap = ({ children, variant = "default" }: CustomMapProps) => {
  const map = useMap();
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [newMarker, setNewMarker] = useState<Marker | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  const { setRestaurantData, restaurantData } = useForm();
  const { setCanContinue, open, setPage, setFlowType } =
    useCreateListingModal();

  useEffect(() => {
    setCanContinue(!!(restaurantData.lat && restaurantData.lng));
    if (variant === "picker" && restaurantData.lat && restaurantData.lng) {
      setNewMarker({ lat: restaurantData.lat, lng: restaurantData.lng });
    }
  }, []);

  useEffect(() => {
    if (!map) return;

    // @TODO figure out what is the type of that event beacause even google does not know it in their documentation xd
    map.addListener("click", (e: any) => {
      if (e.placeId) {
        e.stop();
      }
    });
  }, [map]);

  const onMapClick = (e: MapMouseEvent) => {
    const { latLng, placeId } = e.detail;

    if (!placeId && newMarker) {
      setNewMarker(null);
      setCanContinue(false);
      return;
    }

    setNewMarker({
      lat: latLng!.lat as number,
      lng: latLng!.lng as number,
      id: placeId || "",
    });
    if (variant === "picker") {
      setRestaurantData({
        ...restaurantData,
        lat: latLng!.lat,
        lng: latLng!.lng,
      });
    }

    setCanContinue(true);
  };

  const onClick = async () => {
    if (!newMarker) return;

    if (newMarker.id) {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/google/get-place-from-id",
          {
            method: "POST",
            body: JSON.stringify({ placeId: newMarker.id }),
          }
        );
        const data = await res.json();
        setRestaurantData({
          ...restaurantData,
          lat: data.result.geometry.location.lat,
          lng: data.result.geometry.location.lng,
          name: data.result.name,
        });
      } catch (error) {
        console.log(error);
      }
    }

    open();
    setFlowType("manual");
    setPage(1);
  };

  return (
    <Map
      disableDefaultUI={true}
      defaultCenter={
        variant === "picker" && restaurantData.lat && restaurantData.lng
          ? { lat: restaurantData.lat, lng: restaurantData.lng }
          : { lat: 52, lng: 20 }
      }
      defaultZoom={variant === "picker" ? 15 : 6}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
      disableDoubleClickZoom={true}
      onClick={onMapClick}
      style={{ outline: "none" }}
    >
      {/* {markers.map((marker, i) => (
        <AdvancedMarker
          key={i}
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
        />
      ))} */}
      {newMarker && (
        <>
          <AdvancedMarker
            ref={markerRef}
            position={{ lat: newMarker.lat, lng: newMarker.lng }}
          >
            <div className="w-16 h-16">
              <Image src={Glyph} alt="glyph" fill={true} objectFit="contain" />
            </div>
          </AdvancedMarker>

          {variant !== "picker" && (
            <InfoWindow anchor={marker}>
              <div className="w-36 h-18 flex items-center justify-center p-2">
                <Button
                  variant="dark"
                  className="w-full h-full font-bold text-xl"
                  onClick={onClick}
                >
                  Dodaj
                </Button>
              </div>
            </InfoWindow>
          )}
        </>
      )}
    </Map>
  );
};

export default CustomMap;
