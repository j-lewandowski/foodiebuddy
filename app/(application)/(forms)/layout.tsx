import type { Metadata } from "next";
import { Paytone_One } from "next/font/google";
import "../../globals.css";

import Navbar from "@/app/_components/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";

const font = Paytone_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodiebuddy - aplikacja",
  description: "Foodiebuddy - Twórz, Oceniaj, Odkrywaj",
};

export default function addRestaurantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} relative`}>
        <AuthProvider>
          <Navbar />
          <main className="bg-neutral-100md:pt-20 h-full min-h-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
