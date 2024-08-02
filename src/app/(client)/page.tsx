import HomePage from "@/components/shared/home-page";

import { defaultTitlePage, filmTypesList } from "@/lib/constants";
import { getLatestMovies, getMovies } from "@/lib/movie";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: defaultTitlePage,
};

export default async function Home() {
  const { movies: lastestMovies } = await getLatestMovies();
  const _filmTypeList = [...filmTypesList];
  let cdnImageDomain = "";
  for (let i = 0; i < _filmTypeList.length; i++) {
    const filmType = _filmTypeList[i];
    const { movies, cdnImageDomain: _cdnImageDomain } = await getMovies({
      type: "danh-sach",
      value: filmType.slug,
    });
    filmType.movies = movies;
    cdnImageDomain = _cdnImageDomain;
  }

  return (
    <HomePage
      latestMovies={lastestMovies}
      filmTypeList={_filmTypeList}
      cdnImageDomain={cdnImageDomain}
    />
  );
}
