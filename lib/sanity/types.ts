export interface SanityImage {
  asset?: { _ref: string };
  alt?: string;
}

export interface ArticleCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
  tags?: string[];
}

export interface Article extends ArticleCard {
  author?: string;
  // corps en Portable Text (rendu via components/sanity/PortableText)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
}
