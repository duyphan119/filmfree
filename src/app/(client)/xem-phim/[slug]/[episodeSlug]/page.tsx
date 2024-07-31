import ErrorMessage from "@/components/shared/error-message";
import Information from "@/components/shared/information";
import Streaming from "@/components/shared/streaming";

import axios from "axios";
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
  const { data: detailsData } = await axios.get(
    `https://phimapi.com/phim/${params.slug}`
  );

  if (!detailsData) {
    return {
      title: "Không tìm thấy trang",
    };
  }

  return {
    title: `FILMFREE | Xem phim ${detailsData.movie.name}`,
    description: detailsData.movie.content,
  };
};

export default async function Watching({ params }: Props) {
  try {
    const { data: detailsData } = await axios.get(
      `https://phimapi.com/phim/${params.slug}`
    );

    if (!detailsData) return notFound();

    return (
      <>
        <Information
          item={detailsData.movie}
          hasLinks={true}
          servers={detailsData.episodes}
        />
        <Streaming
          servers={detailsData.episodes}
          movie={detailsData.movie}
          episodeSlug={params.episodeSlug}
        />
      </>
    );
  } catch (error) {
    return <ErrorMessage />;
  }
}
