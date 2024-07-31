import ErrorMessage from "@/components/shared/error-message";
import Information from "@/components/shared/information";

import axios from "axios";
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
        <div className="space-y-4 p-4">
          <div className="">{detailsData.movie.description}</div>
          {detailsData.movie.trailer_url && (
            <div className="">
              <iframe
                width="560"
                height="315"
                src={detailsData.movie.trailer_url.replace(
                  "/watch?v=",
                  "/embed/"
                )}
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
    return <ErrorMessage />;
  }
}
