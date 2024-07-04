"use client";

import VideoPlayer from "@/components/shared/video-player";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function Streaming({
  episodes,
  movie,
  episodeSlug,
}: {
  episodes: any;
  movie: any;
  episodeSlug: any;
}) {
  const [current, setCurrent] = useState<any>(
    (() => {
      let serverName = localStorage.getItem("currentServerName") || "";
      const episode = episodes.find(
        (episode: any) => episode.server_name === serverName
      );
      serverName = episode?.server_name || episodes[0].server_name;
      const serverData = episode?.server_data || episodes[0].server_data;
      const data = serverData.find((item: any) => item.slug === episodeSlug);
      const currentEpisode = data || serverData[0];
      return {
        serverName,
        serverData,
        currentEpisode,
      };
    })()
  );

  console.log(current);

  return (
    <div className="space-y-4 p-4">
      <div className="">
        <VideoPlayer
          url={current.currentEpisode.link_m3u8}
          thumbnail={movie.thumb_url}
        />
      </div>
      <div className="">
        {episodes.map((episode: any) => {
          return (
            <div key={episode.server_name}>
              <div className="">Server {episode.server_name}</div>
              <div className="grid grid-cols-12 gap-3 mt-2">
                {episode.server_data.map(({ name, slug }: any) => {
                  // if (slug === current.currentEpisode.slug) {
                  //   return (
                  //     <Button variant="blue" disabled={true}>
                  //       {name}
                  //     </Button>
                  //   );
                  // }
                  const isActive = slug === current.currentEpisode.slug;
                  return (
                    <Link
                      key={name}
                      href={`/xem-phim/${movie.slug}/${slug}`}
                      className={buttonVariants({
                        variant: "blue",
                        className: cn(
                          "col-span-2 md:col-span-1",
                          isActive &&
                            "bg-blue-200 hover:bg-blue-600/90 ring-4 ring-blue-900 text-blue-900"
                        ),
                      })}
                    >
                      {name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
