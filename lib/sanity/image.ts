import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = imageUrlBuilder({ projectId: projectId || "placeholder", dataset });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
