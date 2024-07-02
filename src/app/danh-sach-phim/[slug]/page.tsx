import ListPage from "@/components/shared/list-page";
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
  let limit = searchParams.limit || 16;
  let page = searchParams.page || 1;
  const response = await fetch(
    `https://phimapi.com/v1/api/danh-sach/${params.slug}?limit=${limit}&page=${page}`
  );
  const jsonData = await response.json();

  const items = jsonData.data.items;

  const { currentPage, totalPages } = jsonData.data.params.pagination;

  return (
    <>
      <ListPage
        currentPage={currentPage}
        totalPages={totalPages}
        items={items}
        slug={params.slug}
      />
    </>
  );
}
