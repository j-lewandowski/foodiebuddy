"use client";

import { useModal } from "@/zustand/stores/create-listing-modal/modalStore";
import { FaArrowLeft, FaXmark } from "react-icons/fa6";
import Button from "@/app/_components/Button";

import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import { useRouter } from "next/navigation";
import { useUser } from "@/zustand/stores/application/userStore";
import { twMerge } from "tailwind-merge";

const MultistepForm = () => {
  const { close } = useModal();
  const {
    restaurantData,
    formInputs,
    page,
    prev,
    next,
    buttonText,
    isLastPage,
    isEditing,
    setIsEditing,
    isNextClickable,
    isPrevClickable,
  } = useForm();
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

  const Page = formInputs[page];

  return (
    <div className="md:w-[900px] md:max-w-[90%] md:h-[650px] md:max-h-[95%] h-full w-full bg-white z-30 md:rounded-lg shadow-xl px-6 py-16 md:py-6 relative flex flex-col">
      <div className="w-full flex justify-between items-center">
        <button
          className={twMerge(
            "p-2 w-fit h-fit duration-200 rounded-full hover:bg-gray-200/80",
            !isPrevClickable && "opacity-0 pointer-events-none"
          )}
          onClick={prev}
        >
          <div className="w-fit h-fit flex items-ceneter justify-center">
            <FaArrowLeft className="h-6 w-6" />
          </div>
        </button>
        <button className="p-2 w-fit h-fit duration-200 rounded-full hover:bg-gray-200/80">
          <div className="w-fit h-fit flex items-ceneter justify-center">
            <FaXmark className="h-6 w-6" onClick={close} />
          </div>
        </button>
      </div>
      <div className="w-full h-full">{<Page />}</div>

      <Button
        className={twMerge(
          "w-full text-xl font-bold hover:scale-105",
          !isNextClickable && "opacity-0 pointer-events-none"
        )}
        variant="dark"
        disabled={!isNextClickable}
        type="submit"
        onClick={isLastPage ? onSubmit : next}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default MultistepForm;
