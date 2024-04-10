import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type AuthContainerVariant = "sign-in" | "sign-up" | "sign-out";

interface AuthContainerProps {
  variant?: AuthContainerVariant;
  children: ReactNode;
}

const AuthContainer = ({
  children,
  variant = "sign-in",
}: AuthContainerProps) => {
  return (
    <div className="md:w-[60%] md:h-[70%] md:border-2 border-primary rounded-lg flex flex-col md:flex-row py-4 items-center px-6">
      <div className="flex-1 h-full">
        <div className="flex flex-col items-center justify-center h-full px-8">
          <Image
            src="/images/Logo.webp"
            alt="Logo"
            height={96}
            width={96}
            className="mb-3"
          />
          <span className="font-semibold text-center text-xl">
            Aby korzystać z aplikacji musisz się{" "}
            {variant === "sign-in" ? "zalogować" : "zarejestrować"}
          </span>
          <p className="pt-6 text-neutral-500 text-sm text-justify">
            Aplikacja wymaga założenia konta abyś nie musiał się martwić, że
            Twoje wybrane knajpy przepadną oraz byś mógł cieszyć się
            korzystaniem z list, które współdzielisz ze swoimi bliskimi. Aby
            dowiedzieć się więcej o polityce prywatności kliknij{" "}
            <Link href="#" className="font-bold text-primary hover:underline">
              tutaj
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="w-[90%] h-[1px] md:h-[90%] md:w-[1px] bg-black/20 my-6 md:my-0"></div>
      <div className="flex-1 h-full">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <span className="font-bold text-3xl md:text-2xl">
            {variant === "sign-in" ? "Zaloguj się z:" : "Zarejestruj się z:"}
          </span>
          <ul className="flex flex-col w-full items-center py-6 space-y-4">
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
