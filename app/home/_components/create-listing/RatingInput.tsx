"use client";
import IconButton from "@/app/_components/IconButton";
import { useForm } from "@/zustand/stores/create-listing-modal/formStore";
import { ChangeEvent, useEffect, useState } from "react";
import { Tb123, TbDecimal } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

interface CustomInputProps {
  min: number;
  max: number;
  value: number;
  visible?: boolean;
  onChange: (value: number) => void;
}

const CustomSlider = ({
  min,
  max,
  value,
  onChange,
  visible,
}: CustomInputProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(+e.target.value);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const mapToRange = (value: number, min: number, max: number) => {
    value = Math.min(Math.max(value, min), max);
    const percentage = (value - min) / (max - min);

    return Math.round(percentage * 100);
  };

  // const calculateThumbPos = (value: number, min: number, max: number) => {
  //   const ratio = (value - min) / (max - min);
  //   return `calc(${32 / 10}px + ${ratio * 100} - ${ratio} * ${32}px)`;
  // }

  return (
    <div
      className={twMerge(
        "relative w-full bg-neutral-500/20 flex items-center rounded-lg duration-150 transition-all my-6",
        !visible && "hidden"
      )}
    >
      <input
        className="range-slider rounded-lg"
        type="range"
        min={min}
        max={max}
        onChange={handleChange}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        value={value}
        style={{
          zIndex: isDragging ? 1 : 2,
          cursor: isDragging ? "grab" : "pointer",
        }}
      />
      <div
        style={{ width: mapToRange(value, min, max) + "%" }}
        className={twMerge(`absolute h-full bg-secondary rounded`)}
      ></div>
      <div className=" absolute -bottom-8 left-0 font-bold">{min}</div>
      <div className=" absolute -bottom-8 right-0 font-bold">{max}</div>
      {/* <div
        style={{
          left: calculateThumbPos(value, min, max),
        }}
        className="h-8 w-8 rounded-full absolute -translate-y-[50%]  top-[50%] bg-primary"
      ></div> */}
    </div>
  );
};

const RatingInput = () => {
  const { restaurantData, setRestaurantData } = useForm();
  const [isIntegerInputOpen, setIsIntegerInputOpen] = useState(true);
  const [intRatingValue, setIntRatingValue] = useState(restaurantData.rating);
  const [decimalRatingValue, setDecimalRatingValue] = useState(0);

  const onChangeInteger = (value: number) => {
    setIntRatingValue(value);
  };

  const onChangeDecimal = (value: number) => {
    if (intRatingValue == 10) {
      setDecimalRatingValue(0);
    }
    setDecimalRatingValue(value);
  };

  useEffect(() => {
    setRestaurantData({
      ...restaurantData,
      rating: intRatingValue + decimalRatingValue / 10,
    });
  }, [intRatingValue, decimalRatingValue]);

  const toggleIntegerInputOpen = () => {
    setIsIntegerInputOpen((state) => !state);
  };

  return (
    <div className="w-[60%] flex flex-col items-center justify-center relative duration-150">
      {/* <input type="range" className="w-full" /> */}
      <CustomSlider
        min={1}
        max={10}
        value={intRatingValue}
        onChange={onChangeInteger}
        visible={isIntegerInputOpen}
      />
      <CustomSlider
        min={0}
        max={9}
        value={decimalRatingValue}
        onChange={onChangeDecimal}
        visible={!isIntegerInputOpen}
      />
      <IconButton
        className="absolute shadow-none bg-transparent hover:bg-neutral-500/20 -right-16"
        onClick={toggleIntegerInputOpen}
      >
        {isIntegerInputOpen ? (
          <TbDecimal className="text-primary h-6 w-6" />
        ) : (
          <Tb123 className="text-primary h-6 w-6" />
        )}
      </IconButton>
    </div>
  );
};

export default RatingInput;
