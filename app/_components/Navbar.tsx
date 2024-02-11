import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import { getServerSession } from "next-auth";

type NavItem = {
  name: string;
  href?: string;
  variant?: "dark" | "ghost" | "blue" | "gray";
};

const authenticatedNavItems = [
  { name: "Tiery", href: "/tiers" },
  { name: "Profil", href: "/profile" },
  {
    name: "Wyloguj się",
    variant: "dark",
    href: "api/auth/signout",
  },
];
const unauthenticatedNavItems = [
  {
    name: "Zaloguj się",
    href: "api/auth/signin",
    variant: "ghost",
  },
  {
    name: "Zarejestruj się",
    href: "api/auth/signin",
    variant: "dark",
  },
];

const Navbar = async () => {
  const session = await getServerSession();

  const navItems = (
    !session ? unauthenticatedNavItems : authenticatedNavItems
  ) as NavItem[];

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
