import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const comfortaa = Comfortaa({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-100 transition-all">
      <body className={comfortaa.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
