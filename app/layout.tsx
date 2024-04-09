import type { Metadata } from "next";
import { Paytone_One, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { SessionProvider } from "next-auth/react";
import Providers from "@/providers/Providers";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const fontLogo = Paytone_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-paytone",
});

export const metadata: Metadata = {
  title: "Foodiebuddy",
  description: "Wersja 3.0 najlepszej aplikacji do oceniania knajp!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} ${fontLogo.variable} relative`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
