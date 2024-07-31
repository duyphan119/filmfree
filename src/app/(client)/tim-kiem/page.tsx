import ErrorMessage from "@/components/shared/error-message";
import SearchResultsPage from "@/components/shared/search-results-page";
import axios from "axios";
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
    let limit = 16;
    let page = 1;

    const {
      data: { data },
    } = await axios.get("https://phimapi.com/v1/api/tim-kiem", {
      params: {
        keyword: searchParams.keyword,
        page,
        limit,
      },
    });

    const count: number = data.params.pagination.totalItems;

    return (
      <SearchResultsPage
        totalPages={Math.ceil(count / limit)}
        limit={limit}
        page={page}
        count={count}
        keyword={searchParams.keyword}
        items={data.items}
        cdnImageDomain={data.APP_DOMAIN_CDN_IMAGE}
      />
    );
  } catch (error) {
    return <ErrorMessage />;
  }
}
