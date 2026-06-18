import type { Metadata } from "next";
import { Suspense } from "react";
import { BonnesPratiquesIndex } from "@/components/pages/BonnesPratiques";

export const metadata: Metadata = {
  title: "Les bonnes pratiques — FEST_ACCESS",
};

export default function Page() {
  return (
    <Suspense>
      <BonnesPratiquesIndex />
    </Suspense>
  );
}
