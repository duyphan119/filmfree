import Information from "@/components/shared/information";
import Streaming from "./components/streaming";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/client";
import { MessageSquareWarning } from "lucide-react";

type Props = {
  params: {
    slug: string;
    episodeSlug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
  const jsonData = await response.json();

  return {
    title: `FILMFREE | Xem phim ${jsonData.movie.name}`,
    description: jsonData.movie.content,
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
    return (
      <div className="bg-destructive text-destructive-foreground p-4 flex gap-1">
        <MessageSquareWarning />
        <span>Có lỗi xảy ra, vui lòng thử lại sau!</span>
      </div>
    );
  }
}
