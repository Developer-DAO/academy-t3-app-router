/* eslint-disable @typescript-eslint/no-unsafe-return */

// Imports
// ========================================================
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
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
});
