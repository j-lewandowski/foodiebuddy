import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: ReactNode | string;
  fullscreen?: boolean;
}

const Button3D = ({ children, fullscreen = false }: ButtonProps) => {
  return (
    <button className="w-full text-center h-14 flex items-center justify-center bg-primary rounded-lg">
      <span className="flex w-full h-full bg-[#495B6B] -translate-y-3 rounded-lg items-center justify-center active:-translate-y-1 duration-150 font-bold font-logo text-white">
        {children}
      </span>
    </button>
  );
};

export default Button3D;
