import axios from "axios";
import * as cheerio from "cheerio";

type CrawledMovie = {
  posterUrl: string;
  name: string;
  originName: string;
  year: number;
  type: string;
  episodeCurrent: string;
  detailsUrl: string;
  country: string;
  updatedAt: string;
  slug: string;
  description: string;
  quality: string;
  language: string;
  trailerUrl: string;
};

const defaultValues: CrawledMovie = {
  posterUrl: "",
  name: "",
  originName: "",
  year: 0,
  type: "",
  episodeCurrent: "",
  detailsUrl: "",
  country: "",
  updatedAt: "",
  slug: "",
  description: "",
  quality: "",
  language: "",
  trailerUrl: "",
};

export const crawlMovies = async (html: string, defaultLimit?: number) => {
  const rows: CrawledMovie[] = [];
  const limit = defaultLimit || 24;

  const $ = cheerio.load(html);

  let count = 0;
  let i = 0;

  $("p span.font-medium").each(function (index) {
    const num = Number($(this).text());
    if (index === 1) {
      count = num;
    }
  });

  $("tbody tr").each(function () {
    if (rows.length < limit) {
      const movie: CrawledMovie = defaultValues;

      $(this)
        .find("td")
        .each(function (indexCol) {
          switch (indexCol) {
            case 0:
              movie.posterUrl = $(this).find("img").attr("src") || "";
              movie.name = $(this).find("a h3").text().trim();
              movie.originName = $(this).find("a h4").text().trim();
              movie.detailsUrl =
                "https://kkphim.vip" + $(this).find("a").attr("href");
              break;
            case 1:
              movie.year = Number($(this).text().trim());
              break;
            case 2:
              movie.episodeCurrent = $(this).text().trim();
              break;
            case 3:
              movie.type = $(this).text().trim();
              break;
            case 4:
              movie.country = $(this).text().trim();
              break;
            case 5:
              movie.updatedAt = $(this).text().trim();
              break;
          }
        });
      rows.push(movie);
    }
  });

  const results = await Promise.allSettled(
    rows.map((item) => axios.get(item.detailsUrl))
  );
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      const $ = cheerio.load(result.value.data);
      rows[index].description = $(".card-collapse-content").eq(0).text().trim();
    }
  });

  return {
    rows,
    count,
  };
};
