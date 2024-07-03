"use client";

import MovieCard from "./movie-card";
import Pagination from "./pagination";

export default function ListPage({
  items,
  currentPage,
  totalPages,
  slug,
}: {
  items: any[];
  currentPage: number;
  totalPages: number;
  slug?: string;
}) {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        {items.map((item: Movie) => {
          return (
            <MovieCard
              key={item._id}
              item={item}
              showCurrentEpisode={true}
              showLanguage={true}
              className="col-span-3"
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
