import {
  AdvancedMarker,
  useAdvancedMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import Glyph from "@/public/images/Glyph.png";
import Button from "@/app/_components/Button";
import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import { useModal } from "@/zustand/stores/create-listing-modal/modalStore";

interface MapMarkerProps {
  markerRef?: any;
  id?: string;
  hasInfowindow?: boolean;
  position: {
    lat: number;
    lng: number;
  };
}

const MapMarker = ({ id, position, hasInfowindow = false }: MapMarkerProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { restaurantData, setRestaurantData, setFormInputs } = useForm();
  const { open } = useModal();

  const onClick = async () => {
    if (id) {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "/api/google/get-place-from-id",
          {
            method: "POST",
            body: JSON.stringify({ placeId: id }),
          }
        );
        const data = await res.json();

        setRestaurantData({
          ...restaurantData,
          lat: data.result.geometry.location.lat || position.lat,
          lng: data.result.geometry.location.lng || position.lng,
          name: data.result.name,
          location: data.result.address_components[3].long_name,
        });
      } catch (error) {
        console.log(error);
      }
    }

    open();
    setFormInputs("MANUAL", 1);
  };

  return (
    <>
      <AdvancedMarker ref={markerRef} position={position}>
        <div className="w-16 h-16 relative">
          <Image
            src={Glyph}
            alt="glyph"
            fill
            style={{ objectFit: "contain" }}
            sizes="(width: 4rem, height: 4rem)"
          />
        </div>
      </AdvancedMarker>
      {hasInfowindow && (
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
  );
};

export default MapMarker;
