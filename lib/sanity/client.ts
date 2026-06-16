import { createClient } from "next-sanity";

// À remplir quand le projet Sanity est créé (voir .env.example).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-10-01";

// true seulement quand un Project ID est fourni → permet de garder le build vert sans Sanity.
export const sanityConfigured = projectId.length > 0;

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true, // CDN Sanity : lectures cachées + invalidées à la publication
});
