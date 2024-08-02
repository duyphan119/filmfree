import Information from "@/components/shared/information";
import Streaming from "@/components/shared/streaming";
import { defaultTitlePage } from "@/lib/constants";
import { getMovie } from "@/lib/movie";
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
  try {
    const { movie } = await getMovie(params.slug);

    return {
      title: `FILMFREE | Xem phim ${movie.name}`,
      description: movie.content,
    };
  } catch (error) {
    return {
      title: defaultTitlePage,
    };
  }
};

export default async function Watching({ params }: Props) {
  try {
    const { movie, servers } = await getMovie(params.slug);

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
    return notFound();
  }
}
