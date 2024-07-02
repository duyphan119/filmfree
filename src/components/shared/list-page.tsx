"use client";

import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import Pagination from "./pagination";

export default function ListPage({
  items,
  currentPage,
  totalPages,
  slug,
}: {
  items: any[];
  currentPage: number;
  totalPages: number;
  slug?: string;
}) {
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
        <div className="col-span-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            generateHref={(page: number) =>
              `/danh-sach-phim/${slug}?page=${page}`
            }
          />
        </div>
      </div>
    </>
  );
}
