"use client";

import MovieSlider from "@/components/shared/movie-slider";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import MovieCard from "./movie-card";
import MovieSkeletonCard from "./movie-skeleton-card";
import { categories } from "./header";
import { Fragment } from "react";

export default function HomePage() {
  return (
    <>
      <Heading href="/danh-sach-phim">Phim mới cập nhật</Heading>
      <MovieSlider />
      {categories.map((category) => {
        return (
          <Fragment key={category.href}>
            <Heading href={`/danh-sach-phim/${category.slug}`}>
              {category.name}
            </Heading>
            <Items
              apiUrl={`https://phimapi.com/v1/api/danh-sach/${category.slug}?limit=8`}
              queryKey={category.slug}
            />
          </Fragment>
        );
      })}
    </>
  );
}

function Heading({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div className="uppercase p-3 text-muted">
      <Link href={href}>{children}</Link>
    </div>
  );
}

function Items({ apiUrl, queryKey }: { apiUrl: string; queryKey: string }) {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(apiUrl);
      return await response.json();
    },
    staleTime: 1000 * 60 * 5000, // 5000 minutes
  });

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {isLoading
        ? new Array(8).fill("").map((_, index) => {
            return <MovieSkeletonCard key={index} className="col-span-3" />;
          })
        : data?.data?.items.map((item: any) => {
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
    </div>
  );
}
