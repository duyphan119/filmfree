import ListPage from "@/components/shared/list-page";
import { getMovies } from "@/lib/movie";
import { notFound, redirect } from "next/navigation";

type MoviesType = {
  searchParams: Record<string, any>;
};

export const generateMetadata = async ({ searchParams }: MoviesType) => {
  try {
    const { value, type } = searchParams;
    if (!value || !type) {
      return;
    }

    if (!value || !type) return notFound();

    const { seoOnPage } = await getMovies({ type, value });

    return {
      title: `FILMFREE | ${seoOnPage.titleHead}`,
      description: seoOnPage.descriptionHead,
    };
  } catch (error) {}
};

const Movies = async ({ searchParams }: MoviesType) => {
  try {
    const { value, type, limit, page } = searchParams;

    if (!value || !type) return notFound();

    const {
      movies,
      cdnImageDomain,
      pagination: { totalPages, currentPage },
    } = await getMovies({ type, value, page, limit: limit || 16 });
    return (
      <ListPage
        cdnImageDomain={cdnImageDomain}
        items={movies}
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    );
  } catch (error) {
    return redirect("/");
  }
};

export default Movies;
