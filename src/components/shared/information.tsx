import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import FallbackImage from "./fallback-image";
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
  MovieServer,
  Server,
} from "@prisma/client";
import { Fragment } from "react";

export default function Information({
  item,
  hasLinks,
  servers,
}: {
  item: Movie & {
    movieActors: Array<MovieActor & { actor: Actor | null }>;
    movieDirectors: Array<MovieDirector & { director: Director | null }>;
    movieCountries: Array<MovieCountry & { country: Country | null }>;
    movieCategories: Array<MovieCategory & { category: Category | null }>;
  };
  hasLinks?: boolean;
  servers: Array<Server & { episodes: Episode[] }>;
}) {
  const hasEpisode = servers.length > 0 && servers[0].episodes.length > 0;

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 sm:col-span-6 lg:col-span-4 relative">
        <AspectRatio ratio={3 / 4}>
          <FallbackImage
            src={item.posterUrl}
            alt={item.slug}
            fill
            className="object-contain"
            sizes="(max-width: 1000px) 50vw, 100vw"
            fallbackSrc={item.thumbnailUrl}
          />
        </AspectRatio>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-8">
        <h1 className="text-3xl">{item.name}</h1>
        <h3 className="text-xl text-slate-400">{item.originName}</h3>
        <p className="mt-2">
          Thể loại:{" "}
          {item.movieCategories.map((movieCategory, index: number) => {
            if (!movieCategory.category) return "";
            const name = movieCategory.category.name;
            return (
              <Fragment key={name}>
                {index > 0 && <span className="text-slate-200">, </span>}
                <Link
                  key={name}
                  href={`/phim?category=${name.replaceAll(" ", "+")}`}
                  className="text-slate-200 hover:text-blue-500 hover:underline hover:underline-offset-2"
                >
                  {name}
                </Link>
              </Fragment>
            );
          })}
        </p>
        <p className="mt-2">
          Quốc gia:{" "}
          {item.movieCountries.map((movieCountry, index: number) => {
            if (!movieCountry.country) return "";
            const name = movieCountry.country.name;
            return (
              <Fragment key={name}>
                {index > 0 && <span className="text-slate-200">, </span>}
                <Link
                  key={name}
                  href={`/phim?country=${name.replaceAll(" ", "+")}`}
                  className="text-slate-200 hover:text-blue-500 hover:underline hover:underline-offset-2"
                >
                  {name}
                </Link>
              </Fragment>
            );
          })}
        </p>
        <p className="mt-2">
          Đạo diễn:{" "}
          {item.movieDirectors.map((movieDirector, index: number) => {
            if (!movieDirector.director) return "";
            const name = movieDirector.director.name;
            return (
              <Fragment key={name}>
                {index > 0 && <span className="text-slate-200">, </span>}
                <Link
                  key={name}
                  href={`/phim?country=${name.replaceAll(" ", "+")}`}
                  className="text-slate-200 hover:text-blue-500 hover:underline hover:underline-offset-2"
                >
                  {name}
                </Link>
              </Fragment>
            );
          })}
        </p>
        <p className="mt-2">
          Diễn viên:{" "}
          {item.movieActors.map((movieActor, index: number) => {
            if (!movieActor.actor) return "";
            const name = movieActor.actor.name;
            return (
              <Fragment key={name}>
                {index > 0 && <span className="text-slate-200">, </span>}
                <Link
                  key={name}
                  href={`/phim?country=${name.replaceAll(" ", "+")}`}
                  className="text-slate-200 hover:text-blue-500 hover:underline hover:underline-offset-2"
                >
                  {name}
                </Link>
              </Fragment>
            );
          })}
        </p>
        <p className="mt-2">
          Thời lượng: <span className="text-slate-200">{item.time}</span>
        </p>
        <p className="mt-2">
          Số tập: <span className="text-slate-200">{item.episodeTotal}</span>
        </p>
        {hasLinks && hasEpisode && (
          <div className="mt-2 space-x-2">
            <Button size="lg" variant="secondary">
              Tải về
            </Button>
            <Link
              href={`/xem-phim/${item.slug}`}
              className={buttonVariants({
                size: "lg",
              })}
            >
              Xem Phim
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
