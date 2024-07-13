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

  return (
    <>
      <Information item={jsonData} />
      <Streaming
        episodes={jsonData.episodes}
        movie={jsonData.movie}
        episodeSlug={params.episodeSlug}
      />
    </>
  );
}
