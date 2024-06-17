import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.scss";

const AkzidenzGroteskBQ = localFont({
  display: "swap",
  variable: "--font-overused-grotesk",
  src: [
    {
      path: "../public/fonts/AkzidenzGroteskBQ-Cnd.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/AkzidenzGroteskBQ-MdCnd.ttf",
      weight: "500",
      style: "medium",
    },
  ],
});

export const metadata: Metadata = {
  title: "Replica of Bullit agency animation",
  description:
    "I recently came across an animation that I found interesting on a website and I decided to replicate it myself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={AkzidenzGroteskBQ.className}>{children}</body>
    </html>
  );
}
