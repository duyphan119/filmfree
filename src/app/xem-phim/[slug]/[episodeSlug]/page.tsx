import VideoPlayer from "@/components/shared/video-player";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Streaming from "./components/streaming";
import Information from "@/components/shared/information";

type Props = {
  params: {
    slug: string;
    episodeSlug: string;
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
