import { twMerge } from "tailwind-merge";
import Input from "@/app/_components/Input";
import { ChangeEvent } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

import { useForm } from "@/zustand/stores/create-listing-modal/formStore";

const AddWithGoogle = () => {
  const {
    googleLink,
    setGoogleLink,
    next,
    setIsNextClickable,
    isNextClickable,
  } = useForm();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGoogleLink(value);

    if (e.target.value.trim() === "") {
      setIsNextClickable(false);
      return;
    }
    const pattern = /^https?:\/\/(www\.)?google\.[a-z]{2,3}(\.[a-z]{2})?\/maps/;
    setIsNextClickable(pattern.test(e.target.value));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // sendLink();
    next();
  };

  // const sendLink = async () => {
  //   const res = await fetch(
  //     process.env.NEXT_PUBLIC_BASE_URL + "/api/google/get-place-from-link",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         googleLink,
  //       }),
  //     }
  //   );

  //   const data = await res.json();
  //   return data;
  // };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <span className="font-bold text-2xl">Wklej link do wizytówki Google</span>
      <p className="w-[80%] text-center mt-6 font-semibold text-neutral-500">
        Aby szybko i wygodnie dodać knajpę możesz skopiować link z Google Maps i
        wkleić go poniżej.
      </p>
      <div className="w-[70%] mt-24 flex items-center justify-center relative">
        <Input
          id="GoogleLink"
          onChange={onChange}
          onInput={onChange}
          value={googleLink}
          placeholder="Link do wizytówki Google"
        />
        <div
          className={twMerge(
            "absolute right-3 hidden bg-background pl-2",
            isNextClickable !== null && "block"
          )}
        >
          {isNextClickable ? (
            <FaCheckCircle className=" h-5 w-5 text-green-500" />
          ) : (
            !isNextClickable &&
            googleLink.length > 0 && (
              <FaCircleXmark className=" h-5 w-5 text-rose-500" />
            )
          )}
        </div>
      </div>
    </form>
  );
};

export default AddWithGoogle;
