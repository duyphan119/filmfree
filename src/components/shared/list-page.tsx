"use client";

import { Movie } from "@prisma/client";
import MovieCard from "./movie-card";
import Pagination from "./pagination";

export default function ListPage({
  items,
  currentPage,
  totalPages,
  slug,
}: {
  items: Movie[];
  currentPage: number;
  totalPages: number;
  slug?: string;
}) {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        {items.map((item) => {
          return (
            <MovieCard
              key={item.id}
              item={item}
              showCurrentEpisode={true}
              showLanguage={true}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            />
          );
        })}
        <div className="col-span-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            generateHref={(page: number) =>
              `/danh-sach-phim/${slug}?page=${page}`
            }
          />
        </div>
      </div>
    </>
  );
}
