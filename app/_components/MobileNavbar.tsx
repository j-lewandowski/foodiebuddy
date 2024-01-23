"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { IoMenu } from "react-icons/io5";
import Drawer from "./Drawer";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((state) => !state);
  };

  return (
    <nav className="block w-full h-28 md:hidden text-white fixed top-3">
      <div className="flex items-center justify-between px-4 bg-dark-blue rounded-lg mx-4 h-full shadow-2xl relative">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/Logo-white.webp"
            height={100}
            width={100}
            alt="Logo"
          />
          <span className="text-2xl">FOODIEBUDDY</span>
        </Link>

        <IoMenu
          className="text-white w-auto h-16 hover:cursor-pointer"
          onClick={toggleOpen}
        />
        {isOpen && (
          <Drawer>
            <Link href="/home">Tierlsity</Link>
          </Drawer>
        )}
      </div>
    </nav>
  );
};

export default MobileNavbar;
