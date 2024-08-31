"use client";

import * as React from "react";
import Content from "./1.mdx"; // TODO: DEV_NOTE: We have to load the mdx content dynamically here

type Props = {
  params: { lessonName: string };
};

export default function DynamicLessonPage() {
  return <Content />;
}
