"use client";

import VideoPlayer from "@/components/shared/video-player";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Actor,
  Category,
  Country,
  Director,
  Episode,
  Movie,
  MovieActor,
  MovieCategory,
  MovieCountry,
  MovieDirector,
  Server,
} from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Streaming({
  servers,
  movie,
  episodeSlug,
}: {
  movie: Movie & {
    movieActors: Array<MovieActor & { actor: Actor | null }>;
    movieDirectors: Array<MovieDirector & { director: Director | null }>;
    movieCountries: Array<MovieCountry & { country: Country | null }>;
    movieCategories: Array<MovieCategory & { category: Category | null }>;
  };

  servers: Array<Server & { episodes: Episode[] }>;
  episodeSlug: any;
}) {
  const [current, setCurrent] = useState<any>(
    (() => {
      let serverName = localStorage.getItem("currentServerName") || "";
      const server =
        servers.find((item) => item.name === serverName) || servers[0] || null;

      const data = server?.episodes.find((item) => item.slug === episodeSlug);
      const currentEpisode = data || server?.episodes[0] || null;
      return {
        server,
        currentEpisode,
      };
    })()
  );

  return (
    <div className="space-y-4 p-4">
      <div className="">
        <VideoPlayer
          url={current.currentEpisode.link_m3u8}
          thumbnail={movie.thumbnailUrl}
        />
      </div>
      <div className="">
        {servers.map((server) => {
          return (
            <div key={server.id}>
              <div className="">Server {server.name}</div>
              <div className="grid grid-cols-12 gap-3 mt-2">
                {server.episodes.map(({ name, slug }: any) => {
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
                        variant: isActive ? "default" : "blue",
                        className: cn("col-span-3 sm:col-span-2 md:col-span-1"),
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
