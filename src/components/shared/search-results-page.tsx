"use client";

import { cn } from "@/lib/utils";
import { Movie } from "@prisma/client";
import MovieCard from "./movie-card";

type SearchResultPageProps = {
  keyword: string;
  movies: Movie[];
  count: number;
};

export default function SearchResultsPage({
  keyword,
  movies,
  count,
}: SearchResultPageProps) {
  return (
    <>
      <div className={cn("p-3")}>
        Kết quả tìm kiếm với từ khóa &quot;{keyword}&quot;:&nbsp;
        {count} kết quả
      </div>
      <div className="grid grid-cols-12 gap-4 p-4">
        {movies.map((item) => {
          return (
            <MovieCard
              key={item.id}
              item={item}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            />
          );
        })}
      </div>
    </>
  );
}
