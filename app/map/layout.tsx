import type { Metadata } from "next";
import Drawer from "../_components/Drawer";
import HomePage from "./_components/HomePage";

export const metadata: Metadata = {
  title: "Foodiebuddy - Mapa",
  description: "Wersja 3.0 najlepszej aplikacji do oceniania knajp!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full h-full relative">
      <Drawer>{children}</Drawer>
      <HomePage />
    </section>
  );
}
