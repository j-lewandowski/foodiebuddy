"use client";

import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import { useRef } from "react";
import { IoRestaurant } from "react-icons/io5";

const ImagePicker = ({ disabled }: { disabled: boolean }) => {
  const { setValue, image } = useRestaurantForm();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    const files = imageInputRef.current?.files;

    if (!files) return;

    setValue({ name: "image", value: URL.createObjectURL(files[0]) });
  };

  return (
    <>
      {image ? (
        <div
          onClick={() => {
            if (!disabled) imageInputRef.current!.click();
          }}
          className="w-9/12 aspect-square bg-cover outline-dark-blue outline-dashed outline-offset-2 rounded-lg"
          style={{
            backgroundImage: `url('${image}')`,
          }}
        ></div>
      ) : (
        <div
          onClick={() => {
            if (!disabled) imageInputRef.current!.click();
          }}
          className="w-9/12 aspect-square outline-2 outline-dark-blue rounded-lg outline-dashed flex items-center justify-center flex-col gap-y-4"
        >
          <IoRestaurant className="w-auto h-24" />
          <span className="text-2xl">Dodaj zdjęcie</span>
        </div>
      )}

      <input
        ref={imageInputRef}
        type="file"
        onChange={onChange}
        className="hidden"
      />
    </>
  );
};

export default ImagePicker;
