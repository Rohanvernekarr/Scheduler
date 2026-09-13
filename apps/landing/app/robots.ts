import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_LANDING_URL || "https://schedulers.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
