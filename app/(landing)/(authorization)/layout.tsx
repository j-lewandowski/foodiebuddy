import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen bg-background pt-16 flex items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
