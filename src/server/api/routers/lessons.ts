/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env";

// Router
// ========================================================
export const lessonsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const constructedWhere =
      env.ENVIRONMENT === "production"
        ? { productionVisible: true }
        : env.ENVIRONMENT === "staging"
          ? { stagingVisible: true }
          : { visible: true };
    const lessons = await ctx.db.lessons.findMany({
      where: {
        ...constructedWhere,
      },
    });
    return lessons;
  }),
  getLessonsByTrackId: protectedProcedure
    .input(z.object({ trackId: z.string() }))
    .query(async ({ input, ctx }) => {
      const constructedWhere =
        env.ENVIRONMENT === "production"
          ? { productionVisible: true }
          : env.ENVIRONMENT === "staging"
            ? { stagingVisible: true }
            : { visible: true };
      const trackLessons = await ctx.db.lessons.findMany({
        where: {
          trackId: {
            equals: input.trackId,
          },
          AND: {
            ...constructedWhere,
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          track: true,
          contributors: {
            include: {
              contributor: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });

      return trackLessons;
    }),
  getLessonsById: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input, ctx }) => {
      const constructedWhere =
        env.ENVIRONMENT === "production"
          ? { productionVisible: true }
          : env.ENVIRONMENT === "staging"
            ? { stagingVisible: true }
            : { visible: true };
      return await ctx.db.lessons.findUnique({
        where: {
          id: input.lessonId,
          AND: {
            ...constructedWhere,
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          contributors: {
            include: {
              contributor: true,
            },
          },
        },
      });
    }),
  getLessonsByTrackPath: publicProcedure
    .input(z.object({ trackPath: z.string() }))
    .query(async ({ input, ctx }) => {
      const track = await ctx.db.tracks.findMany({
        where: {
          trackPath: {
            equals: input.trackPath,
          },
        },
      });

      // if (track === undefined) {
      //   return Error("track not found");
      // }
      const constructedWhere =
        env.ENVIRONMENT === "production"
          ? { productionVisible: true }
          : env.ENVIRONMENT === "staging"
            ? { stagingVisible: true }
            : { visible: true };
      const trackLessons = await ctx.db.lessons.findMany({
        where: {
          trackId: {
            equals: track[0]!.id,
          },
          AND: {
            ...constructedWhere,
          },
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          contributors: {
            include: {
              contributor: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });

      return trackLessons;
    }),
  getFundamentalLessonsByPath: publicProcedure.query(async ({ ctx }) => {
    const constructedWhere =
      env.ENVIRONMENT === "production"
        ? { productionVisible: true }
        : env.ENVIRONMENT === "staging"
          ? { stagingVisible: true }
          : { visible: true };
    const trackLessons = await ctx.db.lessons.findMany({
      where: {
        lessonPath: {
          startsWith: "/fundamentals/",
        },
        AND: {
          ...constructedWhere,
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    return trackLessons;
  }),
  getLessonsByLessonPath: publicProcedure
    .input(z.object({ lessonPath: z.string() }))
    .query(async ({ input, ctx }) => {
      const lesson = await ctx.db.lessons.findMany({
        where: {
          lessonPath: {
            equals: input.lessonPath,
          },
        },
        include: {
          contributors: {
            include: {
              contributor: true,
            },
          },
        },
      });

      return lesson[0];
    }),
  create: protectedProcedure
    .input(
      z.object({
        quizFileName: z.string().min(1),
        lessonTitle: z.string().min(1),
        // authors: z.string().min(1),
        imgPath: z.string().min(1),
        lessonDescription: z.string().min(1),
        lessonPath: z.string().min(1),
        trackId: z.string().min(1),
        // productionVisible: z.boolean(),
        // stagingVisible: z.boolean(),
        // visible: z.boolean(),
        // nextLessonPath: z.string().optional(),
        // order: z.number().min(1).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.lessons.create({
        data: {
          ...input,
        },
      });
    }),
  udpate: protectedProcedure
    .input(
      z.object({
        lessonId: z.string().min(3).max(30),
        quizFileName: z.string().min(1),
        lessonTitle: z.string().min(1),
        // authors: z.string().min(1),
        imgPath: z.string().min(1),
        lessonDescription: z.string().min(1),
        lessonPath: z.string().min(1),
        trackId: z.string().min(1),
        // productionVisible: z.boolean(),
        // stagingVisible: z.boolean(),
        // visible: z.boolean(),
        // nextLessonPath: z.string().optional(),
        // order: z.number().min(1).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { lessonId, ...restData } = input;
      return await ctx.db.lessons.update({
        where: {
          id: lessonId,
        },
        data: { ...restData },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.lessons.delete({
        where: {
          id: input.lessonId,
        },
      });
    }),
});
