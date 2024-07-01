import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    slug?: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response = await fetch(
    `https://phimapi.com/v1/api/danh-sach/${params.slug}`
  );
  const jsonData = await response.json();

  return {
    title: jsonData.data.seoOnPage.titleHead,
    description: jsonData.data.seoOnPage.descriptionHead,
  };
}

export default async function Movies({ params }: Props) {
  const response = await fetch(
    `https://phimapi.com/v1/api/danh-sach/${params.slug}?limit=10`
  );
  const jsonData = await response.json();

  const items = jsonData.data.items;

  return (
    <>
      <div className="grid grid-cols-12 gap-4 p-4">
        {items.map((item: any) => {
          return (
            <Link
              href={`/phim/${item.slug}`}
              key={item._id}
              className="col-span-3 relative"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={`https://kkphim.com/${item.thumb_url}`}
                  alt={item.slug}
                  fill
                  className="rounded-md"
                />
              </AspectRatio>
              <h5 className="text-white mt-2">{item.name}</h5>
              <span className="absolute top-0 left-0 bg-rose-500 text-white p-1 text-xs rounded-ss-md rounded-ee-md opacity-90">
                {item.lang}
              </span>
              <span className="absolute top-0 right-0 bg-sky-500 text-white p-1 text-xs rounded-se-md rounded-es-md opacity-90">
                {item.episode_current}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
