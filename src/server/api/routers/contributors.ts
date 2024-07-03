/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

// Router
// ========================================================
export const contributorsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.contributors.findMany();
  }),
  getAllAvailableByLessonId: protectedProcedure
    .input(
      z.object({
        lessonId: z.string().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const contributorsOnThisLesson =
        await ctx.db.contributorsOnLessons.findMany({
          where: {
            lessonId: input.lessonId,
          },
        });
      const contributorsIds = contributorsOnThisLesson.map(
        (contribution) => contribution.contributorId,
      );
      const contributorsAvailable = await ctx.db.contributors.findMany({
        where: {
          id: { notIn: contributorsIds },
        },
      });
      return contributorsAvailable;
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        image: z.string().min(1),
        position: z.string().min(1),
        twitter: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.contributors.create({
        data: {
          ...input,
        },
      });
    }),
  getAllAvailableByTrackId: protectedProcedure
    .input(
      z.object({
        trackId: z.string().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const contributorsOnThisTrack =
        await ctx.db.contributorsOnTracks.findMany({
          where: {
            trackId: input.trackId,
          },
        });
      const contributorsIds = contributorsOnThisTrack.map(
        (contribution) => contribution.contributorId,
      );
      const contributorsAvailable = await ctx.db.contributors.findMany({
        where: {
          id: { notIn: contributorsIds },
        },
      });
      return contributorsAvailable;
    }),
});
