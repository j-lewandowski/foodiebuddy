"use client";

import { useCreateListingModal } from "@/zustand/stores/create-listing-modal/useCreateListingModal";
import CreateListingModalWrapper from "./CreateListingModalWrapper";
import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";
import { FaArrowLeft, FaXmark } from "react-icons/fa6";

const CreateListingSheet = () => {
  const { prev, page, canContinue, next } = useCreateListingModalWrapper();
  const { close } = useCreateListingModal();

  return (
    <div className="w-[800px] h-[600px] bg-white z-30 rounded-lg shadow-xl px-12 py-6 relative">
      <CreateListingModalWrapper />

      <button className="p-2 w-fit h-fit duration-200 rounded-full hover:bg-gray-200/80 absolute top-6 left-6">
        <div className="w-fit h-fit flex items-ceneter justify-center">
          {page === 0 ? (
            <FaXmark className="h-6 w-6" onClick={close} />
          ) : (
            <FaArrowLeft className="h-6 w-6" onClick={prev} />
          )}
        </div>
      </button>
    </div>
  );
};

export default CreateListingSheet;
