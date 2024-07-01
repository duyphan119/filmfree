import Information from "@/components/shared/information";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Details({ params }: Props) {
  const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
  const jsonData = await response.json();

  const item = jsonData.movie;

  return (
    <>
      <Information item={item} hasLinks={true} />
      <div className="space-y-4 p-4">
        <div className="">{item.content}</div>
        <div className="">
          <iframe
            width="560"
            height="315"
            src={item.trailer_url.replace("/watch?v=", "/embed/")}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            className="mx-auto"
          ></iframe>
        </div>
      </div>
    </>
  );
}
