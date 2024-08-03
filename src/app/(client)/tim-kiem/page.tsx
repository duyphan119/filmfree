import ErrorMessage from "@/components/shared/error-message";
import SearchResultsPage from "@/components/shared/search-results-page";
import { defaultTitlePage } from "@/lib/constants";
import { searchMovies } from "@/lib/movie";
import { redirect } from "next/navigation";

type SearchResultsProps = {
  searchParams: Record<string, any>;
};

export const generateMetadata = async ({
  searchParams,
}: SearchResultsProps) => {
  try {
    const { seoOnPage } = await searchMovies({
      keyword: searchParams.keyword,
      ...searchParams,
    });

    return {
      title: `FILMFREE | ${seoOnPage.titleHead}`,
      description: seoOnPage.descriptionHead,
    };
  } catch (error) {
    return {
      title: defaultTitlePage,
    };
  }
};

export default async function SearchResults({
  searchParams,
}: SearchResultsProps) {
  try {
    if (!searchParams.keyword) {
      return redirect("/");
    }
    const limit = +searchParams.limit || 56;
    const {
      cdnImageDomain,
      movies,
      pagination: { currentPage, totalItems },
    } = await searchMovies({
      keyword: searchParams.keyword,
      ...searchParams,
      limit,
    });
    return (
      <SearchResultsPage
        totalPages={Math.ceil(totalItems / limit)}
        limit={limit}
        page={currentPage}
        count={totalItems}
        keyword={searchParams.keyword}
        items={movies}
        cdnImageDomain={cdnImageDomain}
      />
    );
  } catch (error) {
    return <ErrorMessage />;
  }
}
