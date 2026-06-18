import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";

const atkinsonHyperlegible = localFont({
  src: [
    {
      path: "./fonts/AtkinsonHyperlegibleNext-VariableFont_wght.ttf",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "./fonts/AtkinsonHyperlegibleNext-Italic-VariableFont_wght.ttf",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-atkinson",
  display: "swap",
});

const regensburg = localFont({
  src: [
    {
      path: "./fonts/Regensburg.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Regensburg-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/RegensburgGrunged.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/RegensburgGrunged-Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-regensburg",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FEST_ACCESS — Rendre les festivals de metal accessibles à tous",
  description:
    "Les outils pour rendre votre festival de metal accessible aux personnes en situation de handicap. Gratuit, étape par étape. Par la FMM.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${atkinsonHyperlegible.variable} ${regensburg.variable}`}>
      <body>
        <ClientShell>
          <Nav />
          <main style={{ flexGrow: 1 }}>{children}</main>
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}
