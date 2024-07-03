import Information from "@/components/shared/information";
import Streaming from "./components/streaming";
import { Metadata } from "next";

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
  const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
  const jsonData = await response.json();

  const item = jsonData.movie;
  const episodes = jsonData.episodes;

  return (
    <>
      <Information item={item} />
      <Streaming
        episodes={episodes}
        movie={item}
        episodeSlug={params.episodeSlug}
      />
    </>
  );
}
