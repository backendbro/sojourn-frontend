// app/sitemap.ts
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sojourn.ng";

  // Static routes with last modified dates and priorities
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2024-06-25"),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/host`,
      lastModified: new Date("2024-06-24"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/refer`,
      lastModified: new Date("2024-06-22"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date("2024-06-20"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/host/subscription`,
      lastModified: new Date("2024-06-18"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sustainability`,
      lastModified: new Date("2024-06-15"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
}
