import ButtonDownload from "@/components/shared/button-download";
import ErrorMessage from "@/components/shared/error-message";
import Information from "@/components/shared/information";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/client";
import { notFound } from "next/navigation";

type DownloadEpisodePageProps = {
  params: {
    slug: string;
  };
};

const DownloadEpisodePage = async ({ params }: DownloadEpisodePageProps) => {
  try {
    const movie = await prisma.movie.findFirst({
      where: {
        slug: params.slug,
      },
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
        movieDirectors: {
          include: {
            director: true,
          },
        },
        movieCountries: {
          include: {
            country: true,
          },
        },
      },
    });

    if (!movie) return notFound();
    const servers = await prisma.server.findMany({
      include: {
        episodes: {
          where: {
            movieId: movie.id,
          },
        },
      },
    });
    if (servers.length === 0 || servers[0].episodes.length === 0)
      return notFound();

    return (
      <>
        <Information item={movie} servers={servers} />
        <div className="p-4 grid grid-cols-2 gap-4">
          {servers.map((server) => (
            <Table
              key={server.id}
              className="col-span-2 lg:col-span-1 border rounded-md"
            >
              <TableHeader>
                <TableRow className="bg-slate-300">
                  <TableHead colSpan={2} className="text-slate-800">
                    Server {server.name}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {server.episodes.map((episode) => (
                  <TableRow key={episode.id} className="">
                    <TableCell className="">{episode.name}</TableCell>
                    <TableCell className="border-l text-center w-20">
                      <ButtonDownload url={episode.linkM3u8} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </div>
      </>
    );
  } catch (error) {
    return <ErrorMessage />;
  }
};

export default DownloadEpisodePage;
