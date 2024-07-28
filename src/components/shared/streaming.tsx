"use client";

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
import { useEffect, useState } from "react";

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
  const [current, setCurrent] = useState<{
    server: Server | null;
    currentEpisode: Episode | null;
  } | null>(null);

  useEffect(() => {
    (() => {
      let serverName = localStorage.getItem("currentServerName") || "";
      const server =
        servers.find((item) => item.name === serverName) || servers[0] || null;

      const data = server?.episodes.find((item) => item.slug === episodeSlug);
      const currentEpisode = data || server?.episodes[0] || null;
      setCurrent({
        server,
        currentEpisode,
      });
    })();
  }, [servers, episodeSlug]);

  if (!current || !current.currentEpisode || !current.server) return null;

  const currentSlug = current.currentEpisode.slug;

  return (
    <div className="space-y-4 p-4">
      <div className="">
        <iframe
          src={current.currentEpisode.linkEmbed}
          className="w-full aspect-video"
          allowFullScreen={true}
        ></iframe>
      </div>
      <div className="">
        {servers.map((server) => {
          return (
            <div key={server.id}>
              <div className="">Server {server.name}</div>
              <div className="grid grid-cols-12 gap-3 mt-2">
                {server.episodes.map(({ name, slug }: any) => {
                  const isActive = slug === currentSlug;
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
