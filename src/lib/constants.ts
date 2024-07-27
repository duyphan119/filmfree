import { Movie } from "@prisma/client";

export const filmTypesList = [
  {
    name: "Phim bộ",
    href: "/danh-sach-phim/phim-bo",
    slug: "phim-bo",
    movies: [] as Movie[],
  },
  {
    name: "Phim lẻ",
    href: "/danh-sach-phim/phim-le",
    slug: "phim-le",
    movies: [] as Movie[],
  },
  {
    name: "Hoạt hình",
    href: "/danh-sach-phim/hoat-hinh",
    slug: "hoat-hinh",
    movies: [] as Movie[],
  },
  {
    name: "TV Shows",
    href: "/danh-sach-phim/tv-shows",
    slug: "tv-shows",
    movies: [] as Movie[],
  },
];
