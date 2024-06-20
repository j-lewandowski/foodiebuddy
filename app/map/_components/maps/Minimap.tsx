"use client";
import Map from "./Map";
import { useEffect, useState } from "react";
import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import MapMarker from "./MapMarker";
import { MapMouseEvent } from "@vis.gl/react-google-maps";

const Minimap = () => {
  const { restaurantData, setIsNextClickable, setRestaurantData } = useForm();
  const [newMarker, setNewMarker] = useState<{
    lat: number;
    lng: number;
    id?: string;
  } | null>(null);
  useEffect(() => {
    if (restaurantData.lat && restaurantData.lng) {
      setNewMarker({ lat: restaurantData.lat, lng: restaurantData.lng });
      setIsNextClickable(true);
      setFocusedLocation({ lat: restaurantData.lat, lng: restaurantData.lng });
    }
  }, []);
  const [focusedLocation, setFocusedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const onMapClick = (e: MapMouseEvent) => {
    const { latLng, placeId } = e.detail;

    if (!placeId && newMarker) {
      setNewMarker(null);
      setIsNextClickable(false);
      setRestaurantData({
        ...restaurantData,
        lat: 0,
        lng: 0,
      });
      return;
    }

    setNewMarker({
      lat: latLng!.lat as number,
      lng: latLng!.lng as number,
      id: placeId || "",
    });
    setFocusedLocation({ lat: latLng!.lat, lng: latLng!.lng });
    setRestaurantData({
      ...restaurantData,
      lat: latLng!.lat,
      lng: latLng!.lng,
    });
    setIsNextClickable(true);
  };

  return (
    <Map
      id="minimap"
      zoom={15}
      onClick={onMapClick}
      focusedLocation={focusedLocation}
    >
      {newMarker && <MapMarker position={newMarker} />}
    </Map>
  );
};

export default Minimap;
