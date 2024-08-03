"use client";

import MovieSlider from "@/components/shared/movie-slider";
import { filmTypesList as _filmTypeList } from "@/lib/constants";
import { LatestMovie } from "@/lib/movie";
import Link from "next/link";
import { Fragment } from "react";
import MovieCard from "./movie-card";

type HomePageProps = {
  latestMovies: LatestMovie[];
  filmTypeList: typeof _filmTypeList;
  cdnImageDomain: string;
};

export default function HomePage({
  latestMovies,
  filmTypeList,
  cdnImageDomain,
}: HomePageProps) {
  return (
    <>
      <Heading href="/danh-sach-phim">Phim mới cập nhật</Heading>
      <MovieSlider movies={latestMovies} />
      {filmTypeList.map((filmType) => {
        return (
          <Fragment key={filmType.href}>
            <Heading href={`/danh-sach-phim/${filmType.slug}`}>
              {filmType.name}
            </Heading>
            <div className="grid grid-cols-12 gap-4 p-4">
              {filmType.movies.map((item) => {
                return (
                  <MovieCard
                    key={item._id}
                    name={item.name}
                    slug={item.slug}
                    episodeCurrent={item.episode_current}
                    language={item.lang}
                    posterUrl={`${cdnImageDomain}/${item.poster_url}`}
                    thumbnailUrl={`${cdnImageDomain}/${item.thumb_url}`}
                    showCurrentEpisode={true}
                    showLanguage={true}
                    className="col-span-12 sm:col-span-6 lg:col-span-3"
                  />
                );
              })}
            </div>
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
