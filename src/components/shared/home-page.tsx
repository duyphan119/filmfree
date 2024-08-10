"use client";

import MovieSlider from "@/components/shared/movie-slider";
import { filmTypesList } from "@/lib/constants";
import { LatestMovie, getLatestMovies, getMovies } from "@/lib/movie";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import MovieCard from "./movie-card";

type HomePage = {
  latestMovies: LatestMovie[];
  filmTypeList: typeof filmTypesList;
  cdnImageDomain: string;
};

export default function HomePage() {
  const [data, setData] = useState<HomePage | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { movies: latestMovies } = await getLatestMovies();
        const _filmTypeList = [...filmTypesList];
        let cdnImageDomain = "";
        for (let i = 0; i < _filmTypeList.length; i++) {
          const filmType = _filmTypeList[i];
          const { movies, cdnImageDomain: _cdnImageDomain } = await getMovies({
            type: "danh-sach",
            value: filmType.slug,
            limit: 12,
          });
          filmType.movies = movies;
          cdnImageDomain = _cdnImageDomain;
        }
        setData({
          cdnImageDomain,
          filmTypeList: _filmTypeList,
          latestMovies,
        });
      } catch (error) {}
    })();
  }, []);

  if (!data) return "Loading...";

  return (
    <>
      <Heading href="/danh-sach-phim">Phim mới cập nhật</Heading>
      <MovieSlider movies={data.latestMovies} />
      {data.filmTypeList.map((filmType) => {
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
                    posterUrl={`${data.cdnImageDomain}/${item.poster_url}`}
                    thumbnailUrl={`${data.cdnImageDomain}/${item.thumb_url}`}
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
