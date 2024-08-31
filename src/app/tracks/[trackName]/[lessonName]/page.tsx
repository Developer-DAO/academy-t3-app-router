/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLessonByTrackAndLessonName } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";

import Components from "@/components/mdx/Components";

type Props = {
  params: { trackName: string; lessonName: string };
};

export default async function DynamicLessonPage({ params }: Props) {
  const content = await GetLessonByTrackAndLessonName(
    params.trackName,
    params.lessonName,
  );

  return <MDXRemote source={content} components={Components} />;
}
