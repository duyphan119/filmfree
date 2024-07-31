"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Streaming({
  servers,
  movie,
  episodeSlug,
}: {
  movie: any;
  servers: any[];
  episodeSlug: any;
}) {
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    (() => {
      let serverName = localStorage.getItem("currentServerName") || "";
      const server =
        servers.find((item) => item.name === serverName) || servers[0] || null;

      const data = server?.server_data.find(
        (item: any) => item.slug === episodeSlug
      );
      const currentEpisode = data || server?.server_data[0] || null;
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
          src={current.currentEpisode.link_embed}
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
                {server.server_data.map(({ name, slug }: any) => {
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
