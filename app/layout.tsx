import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "FEST_ACCESS — Rendre les festivals de metal accessibles à tous",
  description:
    "Les outils pour rendre votre festival de metal accessible aux personnes en situation de handicap. Gratuit, étape par étape. Par la FMM.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={atkinsonHyperlegible.variable}>
      <body>
        <Nav />
        <main style={{ flexGrow: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
