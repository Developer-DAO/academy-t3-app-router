/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const completedQuizzesRouter = createTRPCRouter({
  /**
   * Add completed Quizz belonging to the session user
   */
  add: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.completedQuizzes.create({
        data: {
          lessonId: input.lessonId,
          userId: ctx.session.user.id,
          completed: true,
        },
      });
    }),

  /**
   * All completed quizzes belonging to the session user
   */
  all: protectedProcedure.query(async ({ ctx }) => {
    const completedQuizzes = await ctx.db.completedQuizzes.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return completedQuizzes;
  }),
});
