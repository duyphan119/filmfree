import ListPage from "@/components/shared/list-page";

import axios from "axios";
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
    const {
      data: { data },
    } = await axios.get(`https://phimapi.com/v1/api/danh-sach/${params.slug}`, {
      params: {
        page,
        limit,
      },
    });

    const count = data.params.pagination.totalItems;

    return (
      <>
        <ListPage
          currentPage={page}
          totalPages={Math.ceil(count / limit)}
          items={data.items}
          cdnImageDomain={data.APP_DOMAIN_CDN_IMAGE}
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
