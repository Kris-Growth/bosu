import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit-Praha-Kviz - Kvízová hra pro učení svalů",
  description: "Zábavná kvízová hra pro učení svalových partií, jejich cviků, latinských názvů, úponů a začátků",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

