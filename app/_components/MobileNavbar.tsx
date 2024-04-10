"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // @TODO - spinner
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={twMerge(
        "w-full h-full px-3 top-2 left-0 fixed md:hidden block z-10",
        isOpen && "px-0 top-0 left-0"
      )}
    >
      <div
        className={twMerge(
          "bg-primary h-24 flex flex-col items-center justify-center  w-full z-10 shadow-lg rounded-lg duration-200",
          isOpen &&
            "bg-background w-full h-full items-start pt-6 px-6 shadow-none"
        )}
      >
        <div
          className={twMerge(
            "w-full flex justify-around items-center",
            isOpen && "justify-between"
          )}
        >
          <Link
            href="/"
            className={twMerge(
              "font-logo text-2xl",
              isOpen ? "text-primary" : "text-white"
            )}
            onClick={() => setIsOpen(false)}
          >
            FOODIEBUDDY
          </Link>
          <div className="relative w-10 h-10" onClick={toggleOpen}>
            <div
              className={twMerge(
                "w-10 h-1 bg-white rounded-full absolute top-[30%] -translate-y-[50%] left-[50%] -translate-x-[50%] transition-all duration-150",
                isOpen && "rotate-45 top-[50%] bg-primary"
              )}
            ></div>
            <div
              className={twMerge(
                "w-10 h-1 bg-white rounded-full absolute top-[70%] -translate-y-[50%] left-[50%] -translate-x-[50%] transition-all duration-150",
                isOpen && "-rotate-45 top-[50%] bg-primary"
              )}
            ></div>
          </div>
        </div>
        <ul
          className={twMerge(
            "hidden",
            isOpen &&
              "flex flex-col w-full h-full items-start gap-x-4 text-3xl space-y-4 font-bold pt-16 text-black"
          )}
          onClick={toggleOpen}
        >
          {status === "authenticated" ? (
            <>
              <Link href="/signin">Mapka</Link>
              <Link href="/signup">Profil</Link>
              <div onClick={() => signOut()}>Wyloguj</div>
            </>
          ) : (
            <>
              <Link href="/signin">Zaloguj się</Link>
              <Link href="/signup">Zarejestruj się</Link>
              <Link href="/faq">FAQ</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
