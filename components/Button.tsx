"use client";

import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";
import { useRef } from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "blue" | "gray" | "dark" | "ghost";
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  styles?: string;
}

const Button = ({
  children,
  onClick,
  variant = "blue",
  styles,
  href,
  disabled,
}: ButtonProps) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <button
        onClick={onClick ? onClick : () => anchorRef.current!.click()}
        className={twMerge(
          "p-2 px-3 rounded-lg transition duration-200 flex items-center justify-center",
          variant === "blue"
            ? "bg-baby-blue"
            : variant == "gray"
            ? "bg-ash"
            : variant === "ghost"
            ? "bg-transparent border-2 border-dark-blue hover:bg-baby-blue"
            : "bg-dark-blue text-white hover:bg-baby-blue hover:text-dark-blue",
          styles,
          disabled && "bg-dark-ash"
        )}
        disabled={disabled}
      >
        {disabled ? <Spinner /> : children}
      </button>
      {href && <a ref={anchorRef} href={href}></a>}
    </>
  );
};

export default Button;
