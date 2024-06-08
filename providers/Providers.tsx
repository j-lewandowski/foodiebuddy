"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { APIProvider } from "@vis.gl/react-google-maps";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <SessionProvider>{children}</SessionProvider>;
    </APIProvider>
  );
};

export default Providers;
