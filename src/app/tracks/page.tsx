"use server";

import Spinner from "@/components/Spinner";
import { TrackCard } from "@/components/TrackCard";
import { api } from "@/trpc/server";
import { type Tags, type TagsOnTracks } from "@prisma/client";
import Link from "next/link";
import React from "react";

type trackTagsRelation = TagsOnTracks & { tag: Tags };

export default async function TracksPage() {
  const allTracksData = await api.tracks.getAll();

  return (
    <div className="flex h-full w-full flex-col space-y-10 overflow-hidden bg-black lg:h-screen lg:max-h-screen lg:flex-row">
      <div
        className="flex h-full min-h-screen flex-1 flex-col items-center justify-between overflow-hidden 
bg-[url('/bg_tracks.png')] bg-cover bg-no-repeat object-center pt-[300px]  lg:fixed lg:inset-y-0 lg:h-screen lg:w-1/2"
      >
        <div>
          <h2 className="text-bttf text-5xl text-white lg:text-8xl">Tracks</h2>
        </div>
        <div className="flex justify-center">
          <p className="max-w-[275px] text-center text-xl font-bold text-white sm:max-w-xs md:max-w-full lg:text-2xl">
            Developer DAO learning tracks are designed <br /> to get you from 0
            to 1.
          </p>
        </div>
        <div />
      </div>
      <div className="flex-0 flex lg:fixed lg:right-0 lg:top-20 lg:h-screen lg:w-1/2">
        <div className="relative flex max-h-screen w-full flex-1 flex-row space-y-10 overflow-y-scroll bg-black px-8 pb-14 lg:mb-40 lg:pb-28">
          <div className="flex w-full justify-center md:px-2 lg:mb-10 lg:pb-10">
            <div className="grid w-fit justify-center gap-5 sm:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:grid-cols-1 lg:pb-8 xl:grid-cols-2">
              {allTracksData !== undefined && allTracksData.length > 0 ? (
                allTracksData.map((track, idx) => {
                  const trackTags: string[] = track.tags.map(
                    (tagIndex: trackTagsRelation) => tagIndex.tag.tagName,
                  );
                  return (
                    <Link href={track.trackPath} key={idx}>
                      <TrackCard
                        imgSrc={track.imgPath}
                        tags={trackTags}
                        title={track.trackTitle}
                        author={""}
                        description={track.trackDescription}
                      />
                    </Link>
                  );
                })
              ) : (
                <div className="w-full justify-center">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
