import { api } from "@/trpc/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const appUrl =
    process.env.VERCEL_ENV === "production"
      ? `https://academy-t3-app-router.vercel.app` // TODO: after domain update change it to: https://academy.developerdao.com
      : `https://${process.env.VERCEL_URL}`;

  const staticPaths = [
    {
      url: appUrl, // `https://academy.developerdao.com/`,
      lastModified,
    },
    {
      url: `${appUrl}/fundamentals`, // `https://academy.developerdao.com/fundamentals`,
      lastModified,
    },
    {
      url: `${appUrl}/tracks`, // `https://academy.developerdao.com/tracks`,
      lastModified,
    },
  ];

  const tracksData = await api.tracks.getAll();

  const tracksDynamicPaths = tracksData.map((track) => ({
    url: `${appUrl}${track.trackPath}`, // `https://academy.developerdao.com${track.trackPath}`,
    lastModified: lastModified,
  }));

  const lessonsData = await api.lessons.getAll();

  const lessonsDynamicPaths = lessonsData.map((lesson) => ({
    url: `${appUrl}${lesson.lessonPath}`, // `https://academy.developerdao.com${lesson.lessonPath}`,
    lastModified: lastModified,
  }));

  return [...staticPaths, ...tracksDynamicPaths, ...lessonsDynamicPaths];
}
