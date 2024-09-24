import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const appUrl =
    process.env.VERCEL_ENV === "production"
      ? `https://academy-t3-app-router.vercel.app` // TODO: after domain update change it to: https://academy.developerdao.com
      : `https://${process.env.VERCEL_URL}`;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
