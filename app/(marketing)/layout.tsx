import type { Metadata } from "next";
import { Paytone_One } from "next/font/google";
import "../globals.css";
import Navbar from "../_components/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";

const font = Paytone_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodiebuddy",
  description: "Foodiebuddy - Twórz, Oceniaj, Odkrywaj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} relative overflow-hidden`}>
        <AuthProvider>
          <Navbar />
          <main className="bg-neutral-100">{children}</main>
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
