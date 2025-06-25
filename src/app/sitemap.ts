// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/host",
    "/refer",
    "/how-it-works",
    "/host/subscription",
  ].map((route) => ({
    url: `https://sojourn.ng${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Add dynamic routes from CMS here
  return [...routes];
}
