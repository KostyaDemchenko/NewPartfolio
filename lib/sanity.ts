import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// The dataset is public: published documents are readable without a token,
// so the site never needs (or leaks) a write-capable API token.
export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "b8kuna3f",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2023-10-01",
  useCdn: true,
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
