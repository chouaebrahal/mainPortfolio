import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: "wjo44drs",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true,         // Use CDN for faster reads
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}