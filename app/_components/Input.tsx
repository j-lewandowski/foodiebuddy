"use client";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  placeholder,
  onChange,
  id,
  className,
  onInput,
  value,
}: ButtonProps) => {
  return (
    <div className={twMerge("w-full relative", className)}>
      <input
        id={id}
        type={type || "text"}
        onChange={onChange}
        onInput={onInput}
        value={value || ""}
        placeholder={placeholder}
        className={twMerge(
          "w-full bg-background rounded-lg border-2 border-black/10 outline-none px-3 py-2 font-light"
        )}
      />
    </div>
  );
};

export default Input;
