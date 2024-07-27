"use client";

import Link from "next/link";
import FallbackImage from "./fallback-image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Movie } from "@prisma/client";

export default function MovieCard({
  item,
  className,
  showCurrentEpisode,
  showLanguage,
}: {
  item: Movie;
  className?: string;
  showLanguage?: boolean;
  showCurrentEpisode?: boolean;
}) {
  return (
    <Link
      href={`/phim/${item.slug}`}
      key={item.id}
      title={item.name}
      className={cn("relative", className)}
    >
      <AspectRatio ratio={16 / 9}>
        <FallbackImage
          src={item.thumbnailUrl}
          alt={item.slug}
          fill
          className="rounded-md object-cover"
          sizes="(max-width:1000px) 50vw, 100vw"
          priority={true}
          fallbackSrc={item.posterUrl}
        />
      </AspectRatio>
      <h5 className="text-white mt-2 line-clamp-2">{item.name}</h5>
      {showLanguage && (
        <span className="absolute top-0 left-0 bg-rose-500 text-white p-1 text-xs rounded-ss-md rounded-ee-md opacity-90">
          {item.language}
        </span>
      )}
      {showCurrentEpisode && (
        <span className="absolute top-0 right-0 bg-sky-500 text-white p-1 text-xs rounded-se-md rounded-es-md opacity-90">
          {item.episodeCurrent}
        </span>
      )}
    </Link>
  );
}
