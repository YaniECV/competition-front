import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BonnePratiqueDetail } from "@/components/pages/BonnesPratiques";
import { bonnesPratiques } from "@/components/data/bonnesPratiques";

export function generateStaticParams() {
  return bonnesPratiques.map((bp) => ({ slug: bp.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bp = bonnesPratiques.find((b) => b.slug === slug);
  return { title: bp ? `${bp.titre} — FEST_ACCESS` : "Bonne pratique introuvable" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = bonnesPratiques.some((bp) => bp.slug === slug);
  if (!exists) notFound();
  return <BonnePratiqueDetail slug={slug} />;
}
