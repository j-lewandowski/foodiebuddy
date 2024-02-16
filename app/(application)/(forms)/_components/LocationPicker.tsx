"use client";
import Map from "@/app/_components/Map";
import Input from "@/components/Input";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";

import { useMemo } from "react";
import dynamic from "next/dynamic";

const LocationPicker = () => {
  const { setValue } = useRestaurantForm();

  const Map = useMemo(
    () =>
      dynamic(() => import("../../../_components/Map"), {
        ssr: false,
      }),
    []
  );

  return (
    <>
      <span className="text-3xl">Wybierz lokalizację</span>
      <Map />
      <div className="flex gap-x-4">
        <div>
          <span>Miasto</span>
          <Input
            placeholder="Miasto"
            id="city"
            onChange={(e) =>
              setValue({
                name: "city",
                value: e.target.value,
              })
            }
          />
        </div>
        <div>
          <span>Link w Google Maps</span>
          <Input
            placeholder="Link w Google Maps"
            id="googleMapsLink"
            onChange={(e) =>
              setValue({
                name: "googleMapsLink",
                value: e.target.value,
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default LocationPicker;
