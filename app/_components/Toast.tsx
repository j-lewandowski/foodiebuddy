import { useToast } from "@/hooks/useToast";
import { twMerge } from "tailwind-merge";

import { FaRegCircleXmark, FaRegCircleCheck } from "react-icons/fa6";

const Toast = () => {
  const { message, isActive, positive } = useToast();

  return (
    <div
      className={twMerge(
        "w-full px-2 absolute top-[100%] left-0 -z-20 h-fit",
        isActive
          ? "animate-mobileDrawer-open shadow-2xl"
          : "animate-mobileDrawer-closed"
      )}
    >
      <div className="w-full bg-white border-2 border-neutral-400 rounded-b-lg min-h-10 flex items-center justify-center gap-x-4 left-0 text-black py-2">
        {positive ? (
          <FaRegCircleCheck className="w-auto h-8 text-lime-600" />
        ) : (
          <FaRegCircleXmark className="w-auto h-8 text-rose-600" />
        )}
        <span className="text-2 ">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
