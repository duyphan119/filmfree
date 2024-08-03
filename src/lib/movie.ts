import axios from "axios";
import { Category } from "./category";
import { Country } from "./country";

export type LatestMovie = {
  _id: string;
  name: string;
  poster_url: string;
  thumb_url: string;
  slug: string;
  origin_name: string;
  year: number;
};

export type Movie = LatestMovie & {
  episode_current: string;
  lang: string;
  episode_total: string;
  content: string;
  quality: string;
  time: string;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
  trailer_url: string;
};

export type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_m3u8: string;
  link_embed: string;
};

export type Server = {
  server_name: string;
  server_data: Episode[];
};

export type Pagination = {
  totalItems: number;
  totalPages: number;
  totalItemsPerPage: number;
  currentPage: number;
};

export type SeoOnPage = {
  titleHead: string;
  descriptionHead: string;
};

export const getMovies = async ({
  type,
  value,
  page,
  limit,
}: {
  type: "danh-sach" | "the-loai" | "quoc-gia" | string;
  value: string;
  page?: number | string;
  limit?: number | string;
}): Promise<{
  movies: Movie[];
  pagination: Pagination;
  cdnImageDomain: string;
  seoOnPage: SeoOnPage;
}> => {
  const {
    data: { data },
  } = await axios.get(`https://phimapi.com/v1/api/${type}/${value}`, {
    params: {
      page,
      limit,
    },
  });

  return {
    movies: data.items,
    pagination: data.params.pagination,
    cdnImageDomain: data.APP_DOMAIN_CDN_IMAGE,
    seoOnPage: data.seoOnPage,
  };
};

export const getMovie = async (
  slug: string
): Promise<{
  movie: Movie;
  servers: Server[];
}> => {
  const { data } = await axios.get(`https://phimapi.com/phim/${slug}`);

  return {
    movie: data.movie,
    servers: data.episodes,
  };
};

export const searchMovies = async ({
  keyword,
  limit,
  page,
}: {
  keyword: string;
  page?: string | number;
  limit?: string | number;
}): Promise<{
  movies: Movie[];
  pagination: Pagination;
  cdnImageDomain: string;
  seoOnPage: SeoOnPage;
}> => {
  const {
    data: { data },
  } = await axios.get("https://phimapi.com/v1/api/tim-kiem", {
    params: {
      keyword,
      page,
      limit,
    },
  });
  return {
    movies: data.items,
    pagination: data.params.pagination,
    cdnImageDomain: data.APP_DOMAIN_CDN_IMAGE,
    seoOnPage: data.seoOnPage,
  };
};

export const getLatestMovies = async (): Promise<{
  movies: LatestMovie[];
  pagination: Pagination;
}> => {
  const { data } = await axios.get(
    "https://phimapi.com/danh-sach/phim-moi-cap-nhat"
  );

  return {
    movies: data.items,
    pagination: data.pagination,
  };
};
