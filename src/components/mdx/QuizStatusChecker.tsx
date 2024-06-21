"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { ConnectButton } from "@/components/ConnectButton";
import QuizCompletedModals from "@/components/mdx/QuizCompletedModals";

import Quiz from "./Quiz";
import { api } from "@/trpc/react";
import { type CompletedQuizRecord } from "@/types";

export interface QuizStatusCheckerType {
  quiz: string;
  successMessage?: { message: string }[];
  successTitle?: string;
  actionButton?: any;
}

const QuizStatusChecker = ({
  quiz,
  successMessage,
  successTitle,
  actionButton,
}: QuizStatusCheckerType) => {
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const { address, isDisconnected } = useAccount();
  const [nextLessonURLPath, setNextLessonURLPath] = useState("");
  const [nextLessonTitle, setNextLessonTitle] = useState("");
  const [actualLessonTitle, setActualLessonTitle] = useState("");
  const [currentLessonPath, setCurrentLessonPath] = useState("");
  const [completedQuizzesIds, setCompletedQuizzesIds] = useState<string[]>([]);

  const {
    data: completedQuizzesAllData,
    // isLoading: completedQuizzesAllIsLoading,
    refetch: refetchCompletedQuizzesAll,
  } = api.completedQuizzes.all.useQuery(
    undefined, // no input
    {
      // Disable request if no session data
      // enabled: sessionDataUser !== null && address !== undefined,
      enabled: false,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (
      completedQuizzesAllData !== undefined &&
      completedQuizzesAllData.length > 0
    ) {
      const completedIds: string[] = completedQuizzesAllData.map(
        (completedQuiz: CompletedQuizRecord) => completedQuiz.lessonId,
      );
      if (completedIds !== completedQuizzesIds)
        setCompletedQuizzesIds(completedIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedQuizzesAllData]);

  // - Get All lessons data
  const { data: allLessonsData, isLoading: allLessonsDataIsLoading } =
    api.lessons.getAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  // Requests
  useMemo(() => {
    if (
      !allLessonsDataIsLoading &&
      allLessonsData?.length &&
      completedQuizzesIds.length
    ) {
      const actualLessonId: string = allLessonsData.find(
        (lesson: any) => lesson.quizFileName === quiz,
      )!.id;

      if (actualLessonId === undefined) return;

      if (completedQuizzesIds.includes(actualLessonId)) {
        setQuizCompleted(true);
      }
    }
  }, [allLessonsData, allLessonsDataIsLoading, completedQuizzesIds, quiz]);

  useEffect(() => {
    if (allLessonsData && quizCompleted && quiz) {
      const newNextLessonURLPath: string | null = allLessonsData?.find(
        (lesson: any) => lesson.quizFileName === quiz,
      )!.nextLessonPath;

      if (newNextLessonURLPath) {
        setNextLessonURLPath(newNextLessonURLPath);
        const newNextLessonTitle: string = allLessonsData?.find(
          (lesson: any) => lesson.nextLessonPath === newNextLessonURLPath,
        )!.lessonTitle;
        setNextLessonTitle(newNextLessonTitle);

        const newActualLessonTitle: string = allLessonsData?.find(
          (lesson: any) => lesson.quizFileName === quiz,
        )!.lessonTitle;
        setActualLessonTitle(newActualLessonTitle);

        const newCurrentLessonPath: string = allLessonsData?.find(
          (lesson: any) => lesson.quizFileName === quiz,
        )!.lessonPath;
        setCurrentLessonPath(newCurrentLessonPath);
      }
    }
  }, [allLessonsData, quiz, quizCompleted]);

  return isDisconnected === true || address === undefined ? (
    <div className="w-full content-center items-center justify-center text-center">
      <span className="font-future text-3xl font-bold text-[#721F79] underline">
        Connect your wallet and Sign in to start the quiz
      </span>
      <br />
      <br />
      <ConnectButton />
    </div>
  ) : quizCompleted ? (
    <>
      <QuizCompletedModals
        actionButton={actionButton}
        successMessage={successMessage}
        successTitle={successTitle}
        quizCompleted={quizCompleted}
        nextLessonURLPath={nextLessonURLPath}
        nextLessonTitle={nextLessonTitle}
        actualLessonTitle={actualLessonTitle}
        currentLessonPath={currentLessonPath}
      />
      {/* <Badge className="m-auto flex w-fit justify-center bg-green-600">
        <span className="text-2xl">Quiz Completed</span>
      </Badge> */}

      {/* {nextLessonURLPath !== "" ? (
        <Link href={nextLessonURLPath}>
          <ButtonRaw className="font-future w-fit rounded-3xl bg-[#44AF96] text-xs font-normal text-white lg:text-2xl">
            {`NOW TRY ${nextLessonTitle}`}
          </ButtonRaw>
        </Link>
      ) : null} */}
    </>
  ) : (
    <div className="w-full content-center items-center justify-center text-center">
      <span className="font-future text-3xl font-bold text-[#721F79] underline">
        Take the quiz to advance to the next lesson
      </span>
      <br />
      <br />
      <Quiz
        quiz={quiz}
        nextLessonURLPath={nextLessonURLPath}
        nextLessonTitle={nextLessonTitle}
        actualLessonTitle={actualLessonTitle}
      />
    </div>
  );
};

export default QuizStatusChecker;
