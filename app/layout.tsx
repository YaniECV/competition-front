import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FEST_ACCESS — Rendre les festivals de metal accessibles à tous",
  description:
    "Les outils pour rendre votre festival de metal accessible aux personnes en situation de handicap. Gratuit, étape par étape. Par la FMM.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        <main style={{ flexGrow: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
