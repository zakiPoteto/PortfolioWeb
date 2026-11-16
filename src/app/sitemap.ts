import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.zaki-potato.dev",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
