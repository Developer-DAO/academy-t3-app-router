import { GetLessonByTrackAndLessonName } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";
import Components from "@/components/mdx/Components";

type Props = {
  params: { lessonName: string };
};

export default async function FundamentalCliLessonPage({ params }: Props) {
  const content = await GetLessonByTrackAndLessonName(
    "fundamentals",
    params.lessonName,
  );

  return <MDXRemote source={content} components={Components} />;
}
