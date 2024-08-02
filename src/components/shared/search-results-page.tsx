"use client";

import { cn } from "@/lib/utils";
import { ListCollapse } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import MovieCard from "./movie-card";
import { searchMovies } from "@/lib/movie";

type SearchResultPageProps = {
  keyword: string;
  totalPages: number;
  limit: number;
  page: number;
  count: number;
  items: any[];
  cdnImageDomain: string;
};

export default function SearchResultsPage({
  keyword,
  count,
  limit,
  page: defaultPage,
  totalPages,
  items,
  cdnImageDomain,
}: SearchResultPageProps) {
  const [movies, setMovies] = useState<any[]>(items);
  const [page, setPage] = useState<number>(defaultPage);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLoadmore = async () => {
    const newPage = page + limit;
    setIsLoading(true);
    try {
      const { movies: newMovies } = await searchMovies({
        keyword,
        page: newPage,
        limit,
      });

      setMovies([...movies, ...newMovies]);
      setPage(newPage);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickCollapse = async () => {
    setIsLoading(true);
    try {
      const { movies: newMovies } = await searchMovies({
        keyword,
        page: defaultPage,
        limit,
      });

      setMovies(newMovies);
      setPage(defaultPage);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    setPage(defaultPage);
  };

  return (
    <>
      <div className={cn("p-3")}>
        Kết quả tìm kiếm với từ khóa &quot;{keyword}&quot;:&nbsp;
        {count} kết quả
      </div>
      {movies && (
        <div className="grid grid-cols-12 gap-4 p-4">
          {movies.map((item) => {
            return (
              <MovieCard
                key={item._id}
                name={item.name}
                slug={item.slug}
                episodeCurrent={item.episode_current}
                language={item.lang}
                posterUrl={`${cdnImageDomain}/${item.poster_url}`}
                thumbnailUrl={`${cdnImageDomain}/${item.thumb_url}`}
                className="col-span-6 sm:col-span-4 lg:col-span-3"
                showCurrentEpisode={true}
                showLanguage={true}
              />
            );
          })}
          {totalPages > 1 && (
            <div className="col-span-12 flex items-center justify-center">
              {movies.length < count && (
                <Button onClick={handleClickLoadmore} disabled={isLoading}>
                  Xem thêm
                </Button>
              )}
              {movies.length === count && (
                <Button onClick={handleClickCollapse} disabled={isLoading}>
                  <ListCollapse />
                  Thu gọn
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
