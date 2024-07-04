"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import MovieCard from "./movie-card";
import MovieSkeletonCard from "./movie-skeleton-card";

export default function SearchResultsPage({ keyword }: { keyword: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["tim-kiem", keyword],
      queryFn: async ({ pageParam }) => {
        // console.log("pageParam", pageParam);
        const response = await fetch(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=${
            20 * pageParam
          }`
        );

        return await response.json();
      },
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
        const totalPages = Math.ceil(
          lastPage.data.params.pagination.totalItems / 10
        );
        return lastPageParam + 1 <= totalPages ? lastPageParam + 1 : undefined;
      },
      getPreviousPageParam: (
        firstPage,
        allPages,
        firstPageParam,
        allPageParams
      ) => (firstPageParam > 1 ? firstPageParam - 1 : 1),
      initialPageParam: 1,
    });

  useEffect(() => {
    const handleScroll = () => {
      const op = Math.abs(
        document.documentElement.offsetHeight -
          window.innerHeight +
          document.documentElement.scrollTop
      );
      if ((op > 0 && op < 10) || isFetchingNextPage) {
        return;
      }
      if (hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div className={cn("p-3", isLoading && "text-transparent")}>
        Kết quả tìm kiếm với từ khóa &quot;{keyword}&quot;:&nbsp;
        {data?.pages?.[0]?.data?.params?.pagination?.totalItems || 0} kết quả
      </div>
      <div className="grid grid-cols-12 gap-4 p-4">
        {data?.pages?.[data?.pages?.length - 1 || 0]?.data?.items.map(
          (item: Movie) => {
            return (
              <MovieCard
                key={item._id}
                item={item}
                className="col-span-12 sm:col-span-6 lg:col-span-3"
              />
            );
          }
        )}
        {isFetchingNextPage &&
          new Array(20).fill("").map((_, index) => {
            return (
              <MovieSkeletonCard
                key={index}
                className="col-span-12 sm:col-span-6 lg:col-span-3"
              />
            );
          })}
      </div>
    </>
  );
}
