"use client";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = ({
  type,
  placeholder,
  onChange,
  id,
  className,
  onInput,
  value,
  error,
}: ButtonProps) => {
  return (
    <div className={twMerge("w-full relative flex flex-col", className)}>
      <input
        autoComplete="off"
        id={id}
        type={type || "text"}
        onChange={onChange}
        onInput={onInput}
        value={value}
        placeholder={placeholder}
        className={twMerge(
          "w-full bg-background rounded-lg border-2 border-black/10 outline-none px-3 py-2 font-light",
          error && "border-rose-600/40"
        )}
      />
      {error && (
        <span className="text-xs ml-2 font-thin mt-1 text-rose-600/80">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
