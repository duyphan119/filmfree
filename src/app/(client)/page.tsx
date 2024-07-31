import HomePage from "@/components/shared/home-page";

import { filmTypesList } from "@/lib/constants";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `FILMFREE | Xem phim miễn phí`,
};

export default async function Home() {
  const { data: latestMoviesData } = await axios.get(
    "https://phimapi.com/danh-sach/phim-moi-cap-nhat",
    {
      params: {
        page: 1,
        limit: 12,
      },
    }
  );
  const _filmTypeList = [...filmTypesList];
  let cdnImageDomain = "";
  for (let i = 0; i < _filmTypeList.length; i++) {
    const filmType = _filmTypeList[i];
    const { data: response } = await axios.get(
      `https://phimapi.com/v1/api/danh-sach/${filmType.slug}`,
      {
        params: {
          limit: 12,
          page: 1,
        },
      }
    );
    filmType.movies = response.data.items;
    cdnImageDomain = response.data.APP_DOMAIN_CDN_IMAGE;
  }

  return (
    <HomePage
      latestMovies={latestMoviesData.items}
      filmTypeList={_filmTypeList}
      cdnImageDomain={cdnImageDomain}
    />
  );
}
