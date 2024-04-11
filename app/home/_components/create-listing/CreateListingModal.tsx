"use client";

import { useCreateListingModal } from "@/zustand/stores/create-listing-modal/useCreateListingModal";
import CreateListingSheet from "./CreateListingSheet";
import { useCreateListingModalWrapper } from "@/zustand/stores/create-listing-modal/useCreateListinModalWrapper";

const CreateListingModal = () => {
  const { close } = useCreateListingModal();
  const { resetPage } = useCreateListingModalWrapper();

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <div className="relative h-full w-full">
        <div className="w-full h-full flex items-center justify-center relative">
          <CreateListingSheet />
        </div>
        <div
          className="w-full h-full absolute top-0 bg-black/50 z-10"
          onClick={() => {
            close();
            resetPage();
          }}
        ></div>
      </div>
    </div>
  );
};

export default CreateListingModal;
