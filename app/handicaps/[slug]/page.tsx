import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HandicapsDetail } from "@/components/pages/Handicaps";
import { handicaps } from "@/components/data/handicaps";

export function generateStaticParams() {
  return handicaps.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const handicap = handicaps.find((h) => h.slug === slug);
  return { title: handicap ? `${handicap.nom} — Les handicaps — FEST_ACCESS` : "Handicap introuvable" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = handicaps.some((h) => h.slug === slug);
  if (!exists) notFound();
  return <HandicapsDetail slug={slug} />;
}
