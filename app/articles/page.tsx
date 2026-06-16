import Link from "next/link";
import type { Metadata } from "next";
import { getArticles } from "@/lib/sanity/queries";

// ISR : revalidation toutes les 60s + à la demande via /api/revalidate
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Articles — FEST_ACCESS",
  description:
    "Conseils, retours d'expérience et actualités sur l'accessibilité des festivals de metal.",
};

function formatDate(d?: string) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Articles</span>
          <h1>Articles</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Conseils, retours d&apos;expérience et actualités sur l&apos;accessibilité des festivals.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {articles.length === 0 ? (
          <div className="wf-block">
            Aucun article pour le moment. Branchez le projet Sanity (variables d&apos;environnement) pour les afficher.
          </div>
        ) : (
          <div className="grid-2">
            {articles.map((a) => (
              <Link key={a._id} href={`/articles/${a.slug}`} className="card" style={{ display: "block", textDecoration: "none" }}>
                <div className="accent-line" />
                {formatDate(a.publishedAt) && (
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>
                    {formatDate(a.publishedAt)}
                  </p>
                )}
                <h3 style={{ marginBottom: 8, fontSize: "1rem" }}>{a.title}</h3>
                {a.excerpt && <p style={{ fontSize: 13, lineHeight: 1.6 }}>{a.excerpt}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
