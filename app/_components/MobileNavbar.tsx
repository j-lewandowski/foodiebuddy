"use client";

import Image from "next/image";
import Link from "next/link";

import Drawer from "./Drawer";
import { useMobileNavbar } from "@/hooks/useMobileNavbar";
import { signOut, useSession } from "next-auth/react";
import HamburgerIcon from "./HamburgerIcon";
import MobileNavbarItem from "./MobileNavbarItem";

const MobileNavbar = () => {
  const { isOpen, onClose, onOpen } = useMobileNavbar();
  const { status } = useSession();

  return (
    <nav className="block w-full h-28 md:hidden text-white fixed top-3 z-50">
      <div className="flex items-center justify-between px-4 bg-dark-blue rounded-lg mx-4 h-full shadow-2xl relative">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/static/Logo-white.webp"
            height={100}
            width={100}
            alt="Logo"
          />
          <span className="text-xl">FOODIEBUDDY</span>
        </Link>

        <HamburgerIcon />

        <Drawer>
          <div className="flex items-center w-full justify-around space-x-3 px-3">
            {status === "authenticated" ? (
              <>
                <MobileNavbarItem>Tierlisty</MobileNavbarItem>
                <MobileNavbarItem>Profil</MobileNavbarItem>
                <MobileNavbarItem onClick={() => signOut({ callbackUrl: "/" })}>
                  Wyloguj
                </MobileNavbarItem>
              </>
            ) : (
              <>
                <MobileNavbarItem href="/signin">Zaloguj się</MobileNavbarItem>
                <MobileNavbarItem>Zarejestruj się</MobileNavbarItem>
              </>
            )}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default MobileNavbar;
