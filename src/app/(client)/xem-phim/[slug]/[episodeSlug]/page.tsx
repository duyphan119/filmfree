import ErrorMessage from "@/components/shared/error-message";
import Information from "@/components/shared/information";
import Streaming from "@/components/shared/streaming";
import prisma from "@/lib/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
    episodeSlug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const movie = await prisma.movie.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!movie) {
    return {
      title: "Không tìm thấy trang",
    };
  }

  return {
    title: `FILMFREE | Xem phim ${movie.name}`,
    description: movie.description,
  };
};

export default async function Watching({ params }: Props) {
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
        <Streaming
          servers={servers}
          movie={movie}
          episodeSlug={params.episodeSlug}
        />
      </>
    );
  } catch (error) {
    return <ErrorMessage />;
  }
}
