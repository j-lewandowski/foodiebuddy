"use client";

import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-20 w-full flex items-center justify-between shadow-xl px-2 md:px-8 fixed top-0 z-50">
      <Link
        href="/"
        className="w-fit h-fit md:flex items-center justif-center hidden"
      >
        <Image
          src="/images/Logo.png"
          className="mr-3 rounded-lg"
          alt="Logo"
          width={64}
          height={64}
        />
        <div className="text-2xl flex items-center justify-center tracking-tight">
          <span>FOODIE</span>
          <span className="text-gray">BUDDY</span>
        </div>
      </Link>
      <div className="flex gap-x-4 md:w-auto w-full justify-around md:justify-normal md:text-lg">
        <Button variant="ghost" onClick={() => signIn()}>
          Zaloguj się
        </Button>
        <Button variant="dark" onClick={() => signIn()}>
          Zacznij korzystać
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
