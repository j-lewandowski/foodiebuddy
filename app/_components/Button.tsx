import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariants = "ghost" | "dark" | "light";

interface ButtonProps {
  children: ReactNode | string;
  variant?: ButtonVariants;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariants, string> = {
  ghost: "hover:bg-gray-200/90",
  dark: "bg-primary text-white hover:bg-primary/80",
  light: "border-2 border-primary text-black hover:bg-primary hover:text-white",
};

const Button = ({
  children,
  variant = "ghost",
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "px-3 py-2 rounded-lg duration-150",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
