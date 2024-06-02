"use client";

import { useCreateListingModal } from "@/zustand/stores/create-listing-modal/useCreateListingModal";
import { FaArrowLeft, FaXmark } from "react-icons/fa6";
import Decision from "./steps/Decision";
import Button from "@/app/_components/Button";
import RestaurantName from "./steps/manual/RestaurantName";
import RestaurantImage from "./steps/manual/RestaurantImage";
import RestaurantRating from "./steps/manual/RestaurantRating";
import RestaurantRecommendedFood from "./steps/manual/RestaurantRecommendedFood";
import RestaurantPreview from "./steps/RestaurantPreview";
import { useForm } from "@/zustand/stores/create-listing-modal/useForm";
import { useRouter } from "next/navigation";
import { useUser } from "@/zustand/stores/application/useUser";
import AddWithGoogle from "./steps/google/AddWithGoogle";
import RestaurantLocation from "./steps/manual/RestaurantLocation";
import RestaurantFound from "./steps/google/RestaurantFound";

const flows = {
  manual: [
    <Decision key="decision" />,
    <RestaurantName key="name" />,
    <RestaurantImage key="restaurant image" />,
    <RestaurantRating key="resturant rating" />,
    <RestaurantRecommendedFood key="restaurant food" />,
    <RestaurantLocation key="restuant location" />,
    <RestaurantPreview key="restaurant preview" />,
  ],
  google: [
    <Decision key={"decision"} />,
    <AddWithGoogle key={"google link"} />,
    <RestaurantFound key={"restaurant found"} />,
  ],
};

const CreateListingSheet = () => {
  const {
    close,
    prev,
    page,
    canContinue,
    next,
    flowType,
    setCanContinue,
    googleLink,
    setGoogleLink,
  } = useCreateListingModal();
  const { restaurantData, isEditing, setIsEditing } = useForm();
  const router = useRouter();
  const { rankingId } = useUser();

  const onSubmit = async () => {
    const imageKey = await uploadImage();
    // @TODO - error handling

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/restaurants",
        {
          method: isEditing ? "PUT" : "POST",
          body: JSON.stringify({ ...restaurantData, image: imageKey }),
        }
      );

      setIsEditing(false);
      if (res.status === 201) {
        close();
      } else {
        router.replace("/error");
      }
    } catch (error) {
      // Call a image cleanup function
      console.log(error);
    }
  };

  const generateSignedUploadUrl = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/supabase/generate-signed-url?rankingId=${rankingId}`
    );
    const data = await res.json();
    return data;
  };

  const uploadImage = async () => {
    if (!restaurantData.imageFile) return "";
    // Before we upload the image we need to get the signedUrl where we can send the image and save it in database
    const { signedUrl, token, path } = await generateSignedUploadUrl();
    // @TODO - error handling
    if (!signedUrl) return;
    try {
      await fetch(signedUrl, {
        method: "PUT",
        body: restaurantData.imageFile,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return path;
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  return (
    <div className="w-[900px] max-w-[90%] h-[650px] max-h-[95%] bg-white z-30 rounded-lg shadow-xl px-12 py-6 relative flex flex-col">
      <div className="w-full h-full">{flows[flowType][page]}</div>

      {!(
        page === 0 ||
        (flowType === "google" && page === flows.google.length - 1)
      ) && (
        <Button
          className="w-full text-xl font-bold hover:scale-105"
          variant="dark"
          disabled={page !== flows[flowType].length - 1 ? !canContinue : false}
          type="submit"
          onClick={
            page === flows[flowType].length - 1
              ? () => onSubmit()
              : () => next()
          }
        >
          {page === flows[flowType].length - 1
            ? "Zakończ tworzenie i dodaj"
            : "Dalej"}
        </Button>
      )}
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
