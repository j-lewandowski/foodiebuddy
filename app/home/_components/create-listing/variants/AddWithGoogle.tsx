import { twMerge } from "tailwind-merge";
import Input from "@/app/_components/Input";
import { useState, ChangeEvent } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const AddWithGoogle = () => {
  const [googleLink, setGoogleLink] = useState<string>("");
  const [linkIsValid, setLinkIsValid] = useState<boolean | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGoogleLink(value);

    if (e.target.value.trim() === "") {
      setLinkIsValid(null);
      return;
    }
    setLinkIsValid(
      e.target.value.includes("www.google.com/maps") ||
        e.target.value.includes("maps.app.goo.gl")
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
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
            linkIsValid !== null && "block"
          )}
        >
          {linkIsValid && linkIsValid !== null ? (
            <FaCheckCircle className=" h-5 w-5 text-green-500" />
          ) : (
            <FaCircleXmark className=" h-5 w-5 text-rose-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddWithGoogle;
