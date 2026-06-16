import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticleSlugs } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import PortableText from "@/components/sanity/PortableText";

// ISR : pages d'articles régénérées à la demande (webhook Sanity) + toutes les 60s
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable — FEST_ACCESS" };
  return {
    title: `${article.title} — FEST_ACCESS`,
    description: article.excerpt,
  };
}

function formatDate(d?: string) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <article>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Article</span>
          <h1 style={{ maxWidth: 760 }}>{article.title}</h1>
          {(article.publishedAt || article.author) && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)", marginTop: 16 }}>
              {formatDate(article.publishedAt)}
              {article.author ? ` · ${article.author}` : ""}
            </p>
          )}
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80, maxWidth: 800 }}>
        {article.coverImage?.asset && (
          <div style={{ marginBottom: 40 }}>
            <Image
              src={urlFor(article.coverImage).width(1400).fit("max").url()}
              alt={article.coverImage.alt || article.title}
              width={1400}
              height={800}
              priority
              style={{ width: "100%", height: "auto", border: "1px solid var(--border)" }}
            />
          </div>
        )}

        {article.excerpt && (
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--text)", marginBottom: 32, maxWidth: 680 }}>
            {article.excerpt}
          </p>
        )}

        <PortableText value={article.body} />

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
          <Link href="/articles" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "underline" }}>
            ← Tous les articles
          </Link>
        </div>
      </div>
    </article>
  );
}
