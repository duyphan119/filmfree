"use client";

import Link from "next/link";
import FallbackImage from "./fallback-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

export default function MovieCard({
  className,
  showCurrentEpisode,
  showLanguage,
  name,
  slug,
  thumbnailUrl,
  posterUrl,
  episodeCurrent,
  language,
}: {
  className?: string;
  showLanguage?: boolean;
  showCurrentEpisode?: boolean;
  slug: string;
  name: string;
  thumbnailUrl: string;
  posterUrl: string;
  language: string;
  episodeCurrent: string;
}) {
  return (
    <Link
      href={`/phim/${slug}`}
      title={name}
      className={cn("relative", className)}
    >
      <AspectRatio ratio={16 / 9}>
        <FallbackImage
          src={thumbnailUrl}
          alt={slug}
          fill
          className="rounded-md object-cover"
          sizes="(max-width:1000px) 50vw, 100vw"
          priority={true}
          fallbackSrc={posterUrl}
        />
      </AspectRatio>
      <h5 className="text-white mt-2 line-clamp-2">{name}</h5>
      {showLanguage && (
        <span className="absolute top-0 left-0 bg-rose-500 text-white p-1 text-xs rounded-ss-md rounded-ee-md opacity-90">
          {language}
        </span>
      )}
      {showCurrentEpisode && (
        <span className="absolute top-0 right-0 bg-sky-500 text-white p-1 text-xs rounded-se-md rounded-es-md opacity-90">
          {episodeCurrent}
        </span>
      )}
    </Link>
  );
}
