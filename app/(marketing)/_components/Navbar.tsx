import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="h-20 w-full flex items-center justify-between shadow-xl px-2 md:px-8 fixed top-0 z-50">
      <div className="w-fit h-fit md:flex items-center justif-center hidden">
        <Image
          src="/images/Logo.png"
          className="mr-3 rounded-lg"
          alt="Logo"
          width={64}
          height={64}
        />
        <div className="text-2xl flex items-center justify-center">
          <span>Foodie</span>
          <span className="text-gray">buddy</span>
        </div>
      </div>
      <div className="flex gap-x-4 md:w-auto w-full justify-around md:justify-normal md:text-lg">
        <Button variant="ghost">Zaloguj się</Button>
        <Button variant="dark">Zacznij korzystać</Button>
      </div>
    </nav>
  );
};

export default Navbar;
