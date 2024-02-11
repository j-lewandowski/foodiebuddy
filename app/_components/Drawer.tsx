import { useMobileNavbar } from "@/hooks/useMobileNavbar";
import { twMerge } from "tailwind-merge";
import Toast from "./Toast";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useMobileNavbar();

  return (
    <div className="w-full px-2 absolute top-[100%] left-0 -z-10 h-fit">
      <div
        className={twMerge(
          "relative",
          isOpen
            ? "animate-mobileDrawer-open shadow-2xl"
            : "animate-mobileDrawer-closed"
        )}
      >
        <div className="w-full bg-baby-blue rounded-b-lg h-16 flex items-center justify-center left-0">
          {children}
        </div>
        <Toast />
      </div>
    </div>
  );
};

export default Drawer;
