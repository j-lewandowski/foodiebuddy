"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  Map as ReactMap,
  useMap,
  MapMouseEvent,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import Button from "@/app/_components/Button";
import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import { useModal } from "@/zustand/stores/create-listing-modal/modalStore";
import { useRestaurants } from "@/zustand/stores/application/restaurantsStore";
import MapMarker from "../MapMarker";
import { useLocation } from "@/app/hooks/useLocation";

interface MapProps {
  children?: ReactNode;
  zoom?: number;
  id: string;
  onClick?: (e: MapMouseEvent) => void;
  focusedLocation?: { lat: number; lng: number } | null;
}

const Map = ({ children, zoom, id, onClick, focusedLocation }: MapProps) => {
  const map = useMap(id);

  const { setSelectedRestaurant } = useRestaurants();
  const [location, isLoading] = useLocation();

  useEffect(() => {
    if (!map) return;

    // @TODO figure out what is the type of that event beacause even google does not know it in their documentation xd
    map.addListener("click", (e: any) => {
      if (e.placeId) {
        e.stop();
      }
    });

    map.addListener("mousedown", () => {
      setSelectedRestaurant(null);
    });
  }, [map]);

  useEffect(() => {
    if (focusedLocation && map) {
      map?.panTo(focusedLocation);
    }
  }, [focusedLocation, map]);

  if (isLoading) {
    return <div>Loading Map...</div>;
  }

  // Podzial na 3 mapy!!!

  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_ID);

  return (
    <ReactMap
      id={id}
      disableDefaultUI={true}
      defaultCenter={location}
      defaultZoom={zoom || 6}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
      disableDoubleClickZoom={true}
      gestureHandling={"greedy"}
      onClick={onClick}
      style={{ outline: "none" }}
    >
      {/* Rendering pins on the map */}
      {children}
    </ReactMap>
  );
};

export default Map;
