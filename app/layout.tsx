import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk, Poppins, Bebas_Neue, Cinzel, Raleway, Montserrat, Lora } from "next/font/google";
import type { ReactNode } from "react";

// Optimize font loading with display swap and preload
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-glass",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-frozen",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false, // Load on demand
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-water",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-metal",
  weight: ["400"],
  display: "swap",
  preload: false,
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-step1",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-step2",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-step3",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-step4",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Arvado — Premium Digital Growth Studio",
  description:
    "Arvado blends high-end design, AI automation, and performance marketing to help local businesses grow.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${poppins.variable} ${bebas.variable} ${cinzel.variable} ${raleway.variable} ${montserrat.variable} ${lora.variable}`}>
      <body className="bg-slate-950 text-white antialiased w-full overflow-x-hidden">
        <main className="relative z-10 w-full">{children}</main>
      </body>
    </html>
  );
}
