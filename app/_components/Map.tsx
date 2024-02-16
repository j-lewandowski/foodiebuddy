"use client";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import Input from "@/components/Input";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const Map = ({ center }: MapProps) => {
  const [marker, setMarker] = useState<number[] | null>(center || null);
  const { setValue } = useRestaurantForm();

  const MapClickHanlder = () => {
    const map = useMapEvents({
      click: (e) => {
        setMarker([e.latlng.lat, e.latlng.lng]);
        setValue({
          name: "coords",
          value: [e.latlng.lat, e.latlng.lng],
        });
      },
    });
    return null;
  };

  return (
    <>
      <MapContainer
        center={(center as L.LatLngExpression) || [52, 19]}
        zoom={center ? 10 : 5}
        className="h-[35vh] rounded-lg w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHanlder />
        {marker && <Marker position={marker as LatLngExpression} />}
      </MapContainer>
    </>
  );
};

export default Map;
