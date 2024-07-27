import Information from "@/components/shared/information";
import prisma from "@/lib/client";
import { MessageSquareWarning } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
    const jsonData = await response.json();

    return {
      title: `FILMFREE | ${jsonData.movie.name}`,
      description: jsonData.movie.content,
    };
  } catch (error) {
    return {
      title: `FILMFREE | Xem phim miễn phí`,
    };
  }
};

export default async function Details({ params }: Props) {
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

    return (
      <>
        <Information item={movie} hasLinks={true} servers={servers} />
        <div className="space-y-4 p-4">
          <div className="">{movie.description}</div>
          {movie.trailerUrl && (
            <div className="">
              <iframe
                width="560"
                height="315"
                src={movie.trailerUrl.replace("/watch?v=", "/embed/")}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                className="mx-auto"
              ></iframe>
            </div>
          )}
        </div>
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
