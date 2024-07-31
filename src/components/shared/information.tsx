import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import FallbackImage from "./fallback-image";
import { Fragment } from "react";

export default function Information({
  item,
  hasLinks,
  servers,
}: {
  item: any;
  hasLinks?: boolean;
  servers: any[];
}) {
  const hasEpisode = servers.length > 0 && servers[0].server_data.length > 0;

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 sm:col-span-6 lg:col-span-4 relative">
        <AspectRatio ratio={3 / 4}>
          <FallbackImage
            src={item.poster_url}
            alt={item.slug}
            fill
            className="object-contain"
            sizes="(max-width: 1000px) 50vw, 100vw"
            fallbackSrc={item.thumb_url}
          />
        </AspectRatio>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-8">
        <h1 className="text-3xl">{item.name}</h1>
        <h3 className="text-xl text-slate-400">{item.origin_name}</h3>
        <p className="mt-2">
          Thể loại:{" "}
          {item.category.map((category: any, index: number) => {
            return (
              <Fragment key={category.name}>
                {index > 0 && <span className="text-slate-200">, </span>}
                <Link
                  href={`/phim?model=class&value=${category.name.replaceAll(
                    " ",
                    "+"
                  )}`}
                  className="text-slate-200 hover:text-blue-500 hover:underline hover:underline-offset-2"
                >
                  {category.name}
                </Link>
              </Fragment>
            );
          })}
        </p>
        <p className="mt-2">
          Quốc gia:{" "}
          {item.country.map((country: any, index: number) => {
            return (
              <Fragment key={country.name}>
                {index > 0 && <span className="text-slate-200">, </span>}
                <Link
                  href={`/phim?model=area&value=${country.name.replaceAll(
                    " ",
                    "+"
                  )}`}
                  className="text-slate-200 hover:text-blue-500 hover:underline hover:underline-offset-2"
                >
                  {country.name}
                </Link>
              </Fragment>
            );
          })}
        </p>
        <p className="mt-2">
          Đạo diễn:{" "}
          {item.director.map((directorName: string, index: number) => {
            return (
              <Fragment key={directorName}>
                {index > 0 && <span className="text-slate-200">, </span>}
                <Link
                  href={`/phim?model=area&value=${directorName.replaceAll(
                    " ",
                    "+"
                  )}`}
                  className="text-slate-200 hover:text-blue-500 hover:underline hover:underline-offset-2"
                >
                  {directorName}
                </Link>
              </Fragment>
            );
          })}
        </p>
        <p className="mt-2">
          Diễn viên:{" "}
          {item.actor.map((actorName: string, index: number) => {
            return (
              <Fragment key={actorName}>
                {index > 0 && <span className="text-slate-200">, </span>}
                <Link
                  href={`/phim?model=area&value=${actorName.replaceAll(
                    " ",
                    "+"
                  )}`}
                  className="text-slate-200 hover:text-blue-500 hover:underline hover:underline-offset-2"
                >
                  {actorName}
                </Link>
              </Fragment>
            );
          })}
        </p>
        <p className="mt-2">
          Thời lượng: <span className="text-slate-200">{item.time}</span>
        </p>
        <p className="mt-2">
          Số tập: <span className="text-slate-200">{item.episode_total}</span>
        </p>
        {hasLinks && hasEpisode && (
          <div className="mt-2 space-x-2">
            <Link
              href={`/phim/${item.slug}/tai-ve`}
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
              })}
            >
              Tải về
            </Link>
            <Link
              href={`/xem-phim/${item.slug}`}
              className={buttonVariants({
                size: "lg",
              })}
            >
              Xem Phim
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
