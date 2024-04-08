import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="w-full h-16 flex px-12 shadow-md justify-between items-center fixed">
      <Link href={"/"} className="flex items-center justify-center gap-x-3">
        <Image src="/images/Logo.webp" alt="Logo" width={56} height={56} />
        <span className="font-logo text-xl">FOODIEBUDDY</span>
      </Link>
      <ul className="flex w-fit gap-x-4 text-lg font-bold">
        <Button variant="light">Zaloguj się</Button>
        <Button variant="dark">Zarejestruj się</Button>
        <Button variant="ghost">FAQ</Button>
      </ul>
    </div>
  );
};

export default Navbar;
