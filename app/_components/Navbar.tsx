import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import MobileNavbar from "./MobileNavbar";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <>
      <div className="w-full h-16 bg-background px-12 shadow-md justify-between items-center top-0 left-0 fixed hidden md:flex z-50">
        <Link href={"/"} className="flex items-center justify-center gap-x-3">
          <Image src="/images/Logo.webp" alt="Logo" width={56} height={56} />
          <span className="font-logo text-xl">FOODIEBUDDY</span>
        </Link>
        <ul className="flex w-fit gap-x-4 text-lg font-bold">
          {session ? (
            <>
              <Button variant="ghost">Mapka</Button>
              <Button variant="ghost">Profil</Button>
              <Link href="/api/auth/signout">
                <Button variant="dark">Wyloguj</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="light">Zaloguj się</Button>
              </Link>
              <Link href="/signup">
                <Button variant="dark">Zarejestruj się</Button>
              </Link>
              <Link href="/faq">
                <Button variant="ghost">FAQ</Button>
              </Link>
            </>
          )}
        </ul>
      </div>
      <MobileNavbar />
    </>
  );
};

export default Navbar;
