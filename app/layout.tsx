import type { Metadata } from "next";
import { Paytone_One, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Providers from "@/providers/Providers";
import { APIProvider } from "@vis.gl/react-google-maps";

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
      <body
        className={`${font.className} ${fontLogo.variable} relative overflow-hidden`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
