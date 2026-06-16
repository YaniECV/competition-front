import { client, sanityConfigured } from "./client";
import type { Article, ArticleCard } from "./types";

const ARTICLES_LIST = `*[_type == "article" && defined(slug.current)] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt, coverImage, tags
}`;

const ARTICLE_BY_SLUG = `*[_type == "article" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, publishedAt, coverImage, tags, author, body
}`;

const ARTICLE_SLUGS = `*[_type == "article" && defined(slug.current)]{ "slug": slug.current }`;

export async function getArticles(): Promise<ArticleCard[]> {
  if (!sanityConfigured) return [];
  return client.fetch(ARTICLES_LIST);
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!sanityConfigured) return null;
  return client.fetch(ARTICLE_BY_SLUG, { slug });
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!sanityConfigured) return [];
  const rows = await client.fetch<{ slug: string }[]>(ARTICLE_SLUGS);
  return rows.map((r) => r.slug);
}
