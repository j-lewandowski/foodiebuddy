import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  className?: string;
  visible?: boolean;
  onClick?: () => void;
}

const IconButton = ({
  children,
  className,
  onClick,
  visible = true,
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "p-2 bg-secondary text-primary duration-200 rounded-full shadow-lg hover:scale-110 ",
        visible ? "visible" : "invisible",
        className
      )}
      onClick={onClick}
    >
      <div className="w-fit h-fit flex items-center justify-center">
        {children}
      </div>
    </button>
  );
};

export default IconButton;
