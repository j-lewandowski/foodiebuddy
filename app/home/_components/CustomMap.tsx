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

interface CustomMapProps {
  children?: ReactNode;
}

interface Marker {
  lat: number;
  lng: number;
}

const CustomMap = ({ children }: CustomMapProps) => {
  const map = useMap();
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [newMarker, setNewMarker] = useState<Marker | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

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
      return;
    }

    setNewMarker({ lat: latLng!.lat as number, lng: latLng!.lng as number });
  };

  return (
    <Map
      disableDefaultUI={true}
      defaultCenter={{ lat: 52, lng: 20 }}
      defaultZoom={6}
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

          <InfoWindow anchor={marker}>
            <div className="w-36 h-18 flex items-center justify-center p-2">
              <Button
                variant="dark"
                className="w-full h-full font-bold text-xl"
              >
                Dodaj
              </Button>
            </div>
          </InfoWindow>
        </>
      )}
    </Map>
  );
};

export default CustomMap;
