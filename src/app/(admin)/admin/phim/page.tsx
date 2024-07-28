import ButtonCrawlData from "@/components/table/button-crawl-data";
import TableMovie from "@/components/table/table-movie";
import prisma from "@/lib/client";

const AdminMovieListPage = async () => {
  // await prisma.episode.deleteMany();
  // await prisma.movie.deleteMany();
  let movies = await prisma.movie.findMany({
    include: {
      movieActors: {
        include: {
          actor: true,
        },
      },
      movieCategories: {
        include: {
          category: true,
        },
      },
      movieCountries: {
        include: {
          country: true,
        },
      },
      movieDirectors: {
        include: {
          director: true,
        },
      },
    },
    take: 12,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="actions">
        <ButtonCrawlData model="movie" />
      </div>
      <TableMovie movies={movies} url={`/admin/phim`} />
    </>
  );
};

export default AdminMovieListPage;
