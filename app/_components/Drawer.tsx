import { useMobileNavbar } from "@/hooks/useMobileNavbar";
import { twMerge } from "tailwind-merge";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useMobileNavbar();

  return (
    <div
      className={twMerge(
        "w-full px-2 absolute top-[100%] left-0 -z-10 h-fit",
        isOpen
          ? "animate-mobileDrawer-open shadow-2xl"
          : "animate-mobileDrawer-closed"
      )}
    >
      <div className="w-full bg-baby-blue rounded-b-lg h-16 flex items-center justify-center left-0">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
