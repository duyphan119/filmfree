import ListPage from "@/components/shared/list-page";
import prisma from "@/lib/client";
import { MessageSquareWarning } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: {
    slug?: string;
  };
  searchParams: {
    page?: string;
    limit?: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await fetch(
    `https://phimapi.com/v1/api/danh-sach/${params.slug}`
  );
  const jsonData = await response.json();

  return {
    title: jsonData.data.seoOnPage.titleHead,
    description: jsonData.data.seoOnPage.descriptionHead,
  };
}

export default async function Movies({ params, searchParams }: Props) {
  try {
    let limit = Number(searchParams.limit || 16);
    let page = Number(searchParams.page || 1);

    const movies = await prisma.movie.findMany({
      where: {
        type: params.slug,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        updatedAt: "desc",
      },
    });
    const count = await prisma.movie.count({
      where: {
        type: params.slug,
      },
    });

    return (
      <>
        <ListPage
          currentPage={page}
          totalPages={Math.ceil(count / limit)}
          items={movies}
          slug={params.slug}
        />
      </>
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
