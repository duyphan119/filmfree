import Information from "@/components/shared/information";
import { defaultTitlePage } from "@/lib/constants";
import { getMovie } from "@/lib/movie";
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
    const { movie } = await getMovie(params.slug);

    return {
      title: `FILMFREE | ${movie.name}`,
      description: movie.content,
    };
  } catch (error) {
    return {
      title: defaultTitlePage,
    };
  }
};

export default async function Details({ params }: Props) {
  try {
    const { movie, servers } = await getMovie(params.slug);

    return (
      <>
        <Information item={movie} hasLinks={true} servers={servers} />
        <div className="space-y-4 p-4">
          <div className="">{movie.content}</div>
          {movie.trailer_url && (
            <div className="">
              <iframe
                width="560"
                height="315"
                src={movie.trailer_url.replace("/watch?v=", "/embed/")}
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
    return notFound();
  }
}
