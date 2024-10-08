"use client";

import { Movie } from "@/lib/movie";
import MovieCard from "./movie-card";
import Pagination from "./pagination";

export default function ListPage({
  items,
  currentPage,
  totalPages,
  cdnImageDomain,
  searchParams,
}: {
  items: Movie[];
  currentPage: number;
  totalPages: number;
  cdnImageDomain: string;
  searchParams: Record<string, any>;
}) {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        {items.map((item) => {
          return (
            <MovieCard
              key={item._id}
              name={item.name}
              slug={item.slug}
              episodeCurrent={item.episode_current}
              language={item.lang}
              posterUrl={
                cdnImageDomain
                  ? `${cdnImageDomain}/${item.poster_url}`
                  : item.poster_url
              }
              thumbnailUrl={
                cdnImageDomain
                  ? `${cdnImageDomain}/${item.thumb_url}`
                  : item.thumb_url
              }
              className="col-span-6 sm:col-span-4 lg:col-span-3"
              showCurrentEpisode={true}
              showLanguage={true}
            />
          );
        })}
        <div className="col-span-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            generateHref={(page: number) => {
              const qs = new URLSearchParams({
                ...searchParams,
                page: "" + page,
              })?.toString();
              return `/danh-sach-phim?${qs}`;
            }}
          />
        </div>
      </div>
    </>
  );
}
