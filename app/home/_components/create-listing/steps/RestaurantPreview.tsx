import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { useRouter } from "next/navigation";
import { useCreateListingModal } from "@/zustand/stores/create-listing-modal/useCreateListingModal";
import RestaurantDisplay from "../../RestaurantDisplay";

const RestaurantPreview = () => {
  const { close } = useCreateListingModal();
  const { restaurantData } = useForm();
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 py-4">
      <span className="font-bold text-2xl mb-2">Podgląd knajpy</span>
      <p className="w-[70%] text-center text-md font-normal text-neutral-500 mb-4">
        Poniżej możesz sprawdzić jakie dane restauracji będą wyświetlone w
        rankingu. Jeśli, któryś element się nie zgadza, kliknij aby go edytować.
      </p>

      <RestaurantDisplay editable={true} />
    </div>
  );
};

export default RestaurantPreview;
