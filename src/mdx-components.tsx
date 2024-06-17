import type { MDXComponents } from "mdx/types";
import Callout from "@/components/mdx/Callout";
import LessonInformationalModal from "@/components/mdx/LessonInformationalModal";
import LessonQuestionsModal from "@/components/mdx/LessonQuestionsModal";
import Question from "@/components/mdx/Question";
import Quiz from "@/components/mdx/Quiz";
import QuizCompletedModals from "@/components/mdx/QuizCompletedModals";
import QuizStatusChecker from "@/components/mdx/QuizStatusChecker";
import SideDrawer from "@/components/mdx/SideDrawer";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    LessonInformationalModal,
    LessonQuestionsModal,
    Question,
    Quiz,
    QuizCompletedModals,
    QuizStatusChecker,
    SideDrawer,
  };
}
