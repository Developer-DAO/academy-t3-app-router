/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// Router
// ========================================================
export const TagsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.tags.findMany();
  }),
  getTagById: protectedProcedure
    .input(
      z.object({
        tagId: z.string().min(3).max(30),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.tags.findUnique({
        where: {
          id: input.tagId,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        tagName: z.string().min(3).max(30),
        tagDescription: z.string().min(3).max(200),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.tags.create({
        data: {
          ...input,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ tagId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.tags.delete({
        where: {
          id: input.tagId,
        },
      });
    }),
  udpate: protectedProcedure
    .input(
      z.object({
        tagId: z.string().min(3).max(30),
        tagName: z.string().min(3).max(30),
        tagDescription: z.string().min(3).max(200),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { tagId, ...restData } = input;
      return await ctx.db.tags.update({
        where: {
          id: tagId,
        },
        data: {
          ...restData,
        },
      });
    }),
  getAllAvailableByLessonId: protectedProcedure
    .input(
      z.object({
        lessonId: z.string().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const tagsOnThisLesson = await ctx.db.tagsOnLessons.findMany({
        where: {
          lessonId: input.lessonId,
        },
      });
      const tagsAssignedIds = tagsOnThisLesson.map(
        (tagsOnLesson) => tagsOnLesson.tagId,
      );
      const tagsAvailable = await ctx.db.tags.findMany({
        where: {
          id: { notIn: tagsAssignedIds },
        },
      });
      return tagsAvailable;
    }),
});
