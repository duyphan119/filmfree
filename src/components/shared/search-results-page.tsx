"use client";

import { cn } from "@/lib/utils";
import { Movie } from "@prisma/client";
import MovieCard from "./movie-card";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { ListCollapse, Loader2 } from "lucide-react";

type SearchResultPageProps = {
  keyword: string;
  totalPages: number;
  limit: number;
  page: number;
  count: number;
};

export default function SearchResultsPage({
  keyword,
  count,
  limit,
  page: defaultPage,
  totalPages,
}: SearchResultPageProps) {
  const [movies, setMovies] = useState<Movie[]>();
  const [page, setPage] = useState<number>(defaultPage);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLoadmore = () => {
    setPage((prevPage) => prevPage + limit);
  };

  const handleClickCollapse = () => {
    setPage(defaultPage);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const {
          data: { items },
        } = await axios.get("/api/movie", {
          params: {
            keyword,
            page,
            limit,
          },
        });

        setMovies((prevState) => [...(prevState || []), ...items]);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, keyword, limit]);

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
                key={item.id}
                item={item}
                className="col-span-6 sm:col-span-4 lg:col-span-3"
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
