import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: ReactNode | string;
  id?: "ALL" | "S" | "A" | "B" | "C" | "D" | "E" | "F";
  fullscreen?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>) => void;
}

const Button3D = ({
  children,
  fullscreen = false,
  id,
  onClick,
}: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="w-full text-center h-14 flex items-center justify-center bg-primary rounded-lg"
    >
      <span
        id={id}
        className="flex w-full h-full bg-[#495B6B] -translate-y-3 rounded-lg items-center justify-center active:-translate-y-1 duration-150 font-bold font-logo text-white"
      >
        {children}
      </span>
    </button>
  );
};

export default Button3D;
