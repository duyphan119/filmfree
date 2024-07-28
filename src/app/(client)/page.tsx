import HomePage from "@/components/shared/home-page";
import prisma from "@/lib/client";
import { filmTypesList } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `FILMFREE | Xem phim miễn phí`,
};

export default async function Home() {
  const latestMovies = await prisma.movie.findMany({
    take: 10,
    orderBy: { updatedAt: "desc" },
  });
  const _filmTypeList = [...filmTypesList];

  for (let i = 0; i < _filmTypeList.length; i++) {
    const filmType = _filmTypeList[i];
    filmType.movies = await prisma.movie.findMany({
      where: {
        type: filmType.slug,
      },
      take: 12,
      orderBy: { updatedAt: "desc" },
    });
  }

  return <HomePage latestMovies={latestMovies} filmTypeList={_filmTypeList} />;
}
