import Information from "@/components/shared/information";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
  const jsonData = await response.json();

  return {
    title: `FILMFREE | ${jsonData.movie.name}`,
    description: jsonData.movie.content,
  };
};

export default async function Details({ params }: Props) {
  const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
  const jsonData = await response.json();

  return (
    <>
      <Information item={jsonData} hasLinks={true} />
      <div className="space-y-4 p-4">
        <div className="">{jsonData.movie.content}</div>
        {jsonData.movie.trailer_url && (
          <div className="">
            <iframe
              width="560"
              height="315"
              src={jsonData.movie.trailer_url.replace("/watch?v=", "/embed/")}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
              className="mx-auto"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}
