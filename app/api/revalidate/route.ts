import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Webhook appelé par Sanity à chaque publication/édition d'article.
// Configurer dans Sanity → API → Webhooks : POST {URL}/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Secret invalide" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const slug: string | undefined = body?.slug?.current ?? body?.slug;

    // invalide la liste + l'article concerné → régénérés au prochain accès
    revalidatePath("/articles");
    if (slug) revalidatePath(`/articles/${slug}`);

    return NextResponse.json({ revalidated: true, slug: slug ?? null });
  } catch (err) {
    return NextResponse.json({ message: "Erreur", error: String(err) }, { status: 500 });
  }
}
