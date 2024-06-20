"use client";
import { useRestaurants } from "@/zustand/stores/application/restaurantsStore";
import { useUser } from "@/zustand/stores/application/userStore";
import Map from "./Map";
import MapMarker from "./MapMarker";
import { useEffect, useState } from "react";
import { MapMouseEvent } from "@vis.gl/react-google-maps";

const Mainmap = () => {
  const { rankingId, setRankingId } = useUser();
  const { setRestaurants, restaurants } = useRestaurants();
  const [newMarker, setNewMarker] = useState<{
    lat: number;
    lng: number;
    id?: string;
  } | null>(null);

  const fetchRestaurants = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/restaurants?rankingId=${rankingId}`
      );
      const data = await res.json();
      setRestaurants(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchRestaurants();
  // }, [rankingId]);

  const onMapClick = (e: MapMouseEvent) => {
    const { latLng, placeId } = e.detail;

    if (!placeId && newMarker) {
      setNewMarker(null);
      return;
    }

    setNewMarker({
      lat: latLng!.lat as number,
      lng: latLng!.lng as number,
      id: placeId || "",
    });
  };

  return (
    <Map id="main" onClick={onMapClick}>
      {restaurants.map((r) => (
        <MapMarker key={r.name + r.id} position={{ lat: r.lat, lng: r.lng }} />
      ))}
      {newMarker && (
        <MapMarker
          id={newMarker.id}
          position={{ lat: newMarker.lat, lng: newMarker.lng }}
          hasInfowindow
        />
      )}
    </Map>
  );
};

export default Mainmap;
