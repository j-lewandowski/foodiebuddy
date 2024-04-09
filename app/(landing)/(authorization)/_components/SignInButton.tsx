"use client";
import { signIn } from "next-auth/react";

const SignInButton = ({ provider, id }: { provider: string; id: string }) => {
  return (
    <button
      onClick={() => signIn(id)}
      key={provider}
      className="bg-secondary py-2 px-4 w-[50%] text-center font-bold rounded-full"
    >
      {provider}
    </button>
  );
};

export default SignInButton;
