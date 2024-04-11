import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";
import Decision from "./variants/Decision";
import AddWithGoogle from "./variants/AddWithGoogle";

const CreateListinModalWrapper = () => {
  const addWithGoogleFlow = [<Decision key={1} />, <AddWithGoogle key={2} />];
  const addManualyFlow = [<Decision key={1} />];

  const flows = {
    google: addWithGoogleFlow,
    manual: addManualyFlow,
  };

  const { page } = useCreateListingModalWrapper();

  return <div className="w-full h-full">{addWithGoogleFlow[page]}</div>;
};

export default CreateListinModalWrapper;
