import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";
import Decision from "./steps/Decision";
import AddWithGoogle from "./steps/google/AddWithGoogle";
import RestaurantName from "./steps/manual/RestaurantName";
import RestaurantImage from "./steps/manual/RestaurantImage";
import RestaurantRating from "./steps/manual/RestaurantRating";
import RestaurantRecommendedFood from "./steps/manual/RestaurantRecommendedFood";

const CreateListingModalWrapper = () => {
  const addWithGoogleFlow = [<Decision key={1} />, <AddWithGoogle key={2} />];
  const addManualyFlow = [
    <Decision key={1} />,
    <RestaurantName key={2} />,
    <RestaurantImage key={3} />,
    <RestaurantRating key={4} />,
    <RestaurantRecommendedFood key={5} />,
  ];

  const flows = {
    google: addWithGoogleFlow,
    manual: addManualyFlow,
  };

  const { page, flowType } = useCreateListingModalWrapper();

  return <div className="w-full h-full">{flows[flowType][page]}</div>;
};

export default CreateListingModalWrapper;
