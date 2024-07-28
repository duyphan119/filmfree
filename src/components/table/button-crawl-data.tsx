"use client";

import axios from "axios";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

type ButtonCrawlDataProps = {
  model: "movie" | "category" | "country" | "director" | "actor";
};

const ButtonCrawlData = ({ model }: ButtonCrawlDataProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const crawlMovieData = async (typeSlug: string) => {
    let currentPage = 1;
    let count = 0;
    const response = await fetch(
      `https://phimapi.com/v1/api/danh-sach/${typeSlug}?limit=10&page=${currentPage}`
    );
    const {
      data: { items },
    }: any = await response.json();

    for (let i = 0; i < items.length; i++) {
      await axios.get(`/api/crawl/movie/${items[i].slug}`, {
        params: {
          type: typeSlug,
        },
      });
      console.log("crawl movie data success ", ++count);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      switch (model) {
        case "movie":
          await Promise.allSettled([
            crawlMovieData("phim-bo"),
            crawlMovieData("phim-le"),
            crawlMovieData("hoat-hinh"),
            crawlMovieData("tv-shows"),
          ]);
          break;
        case "category":
          break;
        case "country":
          break;
        case "director":
          break;
        case "actor":
          break;
      }
    } catch (error) {
      console.log("crawl data ", model, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="animate-spin w-4 h-4 mr-1" />
      ) : (
        <Download className="w-4 h-4 mr-1" />
      )}
      {isLoading ? "Crawling..." : "Crawl Data"}
    </Button>
  );
};

export default ButtonCrawlData;
