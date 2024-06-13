"use client";
import { signIn } from "next-auth/react";

const SignInButton = ({ provider, id }: { provider: string; id: string }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        signIn(id);
      }}
      key={provider}
      className="bg-secondary py-2 px-4 w-48 h-12 md:h-auto md:w-[50%] text-center font-bold rounded-full text-xl"
    >
      {provider}
    </button>
  );
};

export default SignInButton;
