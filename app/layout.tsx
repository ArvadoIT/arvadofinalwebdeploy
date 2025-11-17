import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Arvado — Premium Digital Growth Studio",
  description:
    "Arvado blends high-end design, AI automation, and performance marketing to help local businesses grow.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-slate-950 text-white antialiased w-full overflow-x-hidden">
        <main className="relative z-10 w-full">{children}</main>
      </body>
    </html>
  );
}
