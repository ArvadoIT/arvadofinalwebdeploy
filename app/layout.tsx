import "./globals.css";
import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arvado — Premium Digital Growth Studio",
  description:
    "Arvado blends high-end design, AI automation, and performance marketing to help local businesses grow.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="bg-slate-950 text-white antialiased">{children}</body>
    </html>
  );
}
