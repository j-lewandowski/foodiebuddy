import Link from "next/link";
import { twMerge } from "tailwind-merge";

const FloatingButton = ({
  children,
  styles,
  href,
}: {
  children: React.ReactNode;
  styles?: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "h-16 w-16 rounded-full flex items-center justify-center bg-dark-blue text-white p-2 fixed bottom-4 right-4 shadow-xl",
        styles
      )}
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
