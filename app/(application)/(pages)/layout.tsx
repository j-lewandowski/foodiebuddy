import type { Metadata } from "next";
import { Paytone_One } from "next/font/google";
import "../../globals.css";

import Navbar from "@/app/_components/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";
import FloatingButton from "../../_components/buttons/FloatingButton";
import { FaPlus } from "react-icons/fa6";

const font = Paytone_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodiebuddy - aplikacja",
  description: "Foodiebuddy - Twórz, Oceniaj, Odkrywaj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} relative`}>
        <AuthProvider>
          <Navbar />
          <main className="bg-neutral-100 pt-36 md:pt-20 min-h-screen pb-8">
            {children}
          </main>
          <FloatingButton href="/addRestaurant">
            <FaPlus className="w-auto h-8" />
          </FloatingButton>
          {/* <Image
            src={"/images/Logo.webp"}
            alt="Logo background"
            width={500}
            height={500}
            className="absolute bottom-0 -left-52 rotate-45 opacity-60"
          />
          <Image
            src={"/images/Logo.webp"}
            alt="Logo background"
            width={500}
            height={500}
            className="absolute top-28 right-0 -scale-x-100 rotate-12 opacity-60"
          /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
