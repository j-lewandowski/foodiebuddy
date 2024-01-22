import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "blue" | "gray" | "dark" | "ghost";
  onClick?: () => void;
  styles?: string;
}

const Button = ({
  children,
  onClick,
  variant = "blue",
  styles,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "p-2 px-3 rounded-lg transition duration-200",
        variant === "blue"
          ? "bg-baby-blue"
          : variant == "gray"
          ? "bg-ash"
          : variant === "ghost"
          ? "bg-transparent border-2 border-dark-blue hover:bg-baby-blue"
          : "bg-dark-blue text-white hover:bg-baby-blue hover:text-dark-blue",
        styles
      )}
    >
      {children}
    </button>
  );
};

export default Button;
