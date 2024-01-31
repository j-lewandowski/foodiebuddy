"use client";

import Button from "@/components/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import { useMemo } from "react";

type NavItem = {
  name: string;
  href?: string;
  variant?: "dark" | "ghost" | "blue" | "gray";
  onClick?: () => void;
};

const Navbar = () => {
  const { status } = useSession();

  const navItems = useMemo((): NavItem[] => {
    if (status !== "authenticated" && status !== "loading") {
      return [
        {
          name: "Zaloguj się",
          href: "/signin",
          variant: "ghost",
          onClick: () => signIn(),
        },
        {
          name: "Zarejestruj się",
          href: "/signin",
          variant: "dark",
          onClick: () => signIn(),
        },
      ];
    }
    return [
      { name: "Tiery", href: "/tiers" },
      { name: "Profil", href: "/profile" },
      {
        name: "Wyloguj się",
        variant: "dark",
        onClick: () => signOut({ callbackUrl: "/" }),
      },
    ];
  }, [status]);

  return (
    <>
      <nav className="h-20 w-full bg-white items-center justify-between shadow-xl px-2 md:px-8 fixed top-0 z-50 hidden md:flex">
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
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={item.variant ? item.variant : "ghost"}
              onClick={item.onClick}
              href={item.href}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </nav>
      <MobileNavbar />
    </>
  );
};

export default Navbar;
