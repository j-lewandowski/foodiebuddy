import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";
import IconButton from "@/app/_components/IconButton";
import { FaArrowRight } from "react-icons/fa6";

const NextPageButton = ({ onClick }: { onClick?: () => void }) => {
  const { canContinue, next } = useCreateListingModalWrapper();

  return (
    <IconButton
      className="mt-6"
      visible={canContinue}
      onClick={onClick || next}
    >
      <FaArrowRight className="h-6 w-6" />
    </IconButton>
  );
};

export default NextPageButton;
