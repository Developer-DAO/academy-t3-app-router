import { api } from "@/trpc/server";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPaths = [
    {
      url: "https://academy-t3-app-router.vercel.app/", // `https://academy.developerdao.com/`,
      lastModified,
    },
    {
      url: "https://academy-t3-app-router.vercel.app/fundamentals", // `https://academy.developerdao.com/fundamentals`,
      lastModified,
    },
    {
      url: "https://academy-t3-app-router.vercel.app/tracks", // `https://academy.developerdao.com/tracks`,
      lastModified,
    },
  ];

  const tracksData = await api.tracks.getAll();

  const tracksDynamicPaths = tracksData.map((track) => ({
    url: `https://academy-t3-app-router.vercel.app${track.trackPath}`, // `https://academy.developerdao.com${track.trackPath}`,
    lastModified: lastModified,
  }));

  const lessonsData = await api.lessons.getAll();

  const lessonsDynamicPaths = lessonsData.map((lesson) => ({
    url: `https://academy-t3-app-router.vercel.app${lesson.lessonPath}`, // `https://academy.developerdao.com${lesson.lessonPath}`,
    lastModified: lastModified,
  }));

  return [...staticPaths, ...tracksDynamicPaths, ...lessonsDynamicPaths];
}
