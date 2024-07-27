import SearchResultsPage from "@/components/shared/search-results-page";
import prisma from "@/lib/client";
import { MessageSquareWarning } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    keyword?: string;
    page?: string;
    limit?: string;
  };
};

export const generateMetadata = async ({ searchParams }: Props) => {
  const response = await fetch(
    `https://phimapi.com/v1/api/tim-kiem?keyword=${searchParams.keyword}`
  );

  const jsonData = await response.json();

  return {
    title: jsonData.data.seoOnPage.titleHead,
    description: jsonData.data.seoOnPage.descriptionHead,
  };
};

export default async function SearchResults({ searchParams }: Props) {
  try {
    if (!searchParams.keyword) {
      return redirect("/");
    }
    let limit = Number(searchParams.limit || 16);
    let page = Number(searchParams.page || 1);

    const movies = await prisma.movie.findMany({
      where: {
        name: {
          contains: searchParams.keyword,
          mode: "insensitive",
        },
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        updatedAt: "desc",
      },
    });
    const count = await prisma.movie.count({
      where: {
        name: {
          contains: searchParams.keyword,
          mode: "insensitive",
        },
      },
    });
    return (
      <SearchResultsPage
        count={count}
        movies={movies}
        keyword={searchParams.keyword}
      />
    );
  } catch (error) {
    return (
      <div className="bg-destructive text-destructive-foreground p-4 flex gap-1">
        <MessageSquareWarning />
        <span>Có lỗi xảy ra, vui lòng thử lại sau!</span>
      </div>
    );
  }
}
