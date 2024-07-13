import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import FallbackImage from "./fallback-image";

export default function Information({
  item,
  hasLinks,
}: {
  item: any;
  hasLinks?: boolean;
}) {
  const hasEpisode =
    item.episodes.length > 0 && item.episodes[0].server_data.length > 0;

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 sm:col-span-6 lg:col-span-4 relative">
        <AspectRatio ratio={3 / 4}>
          <FallbackImage
            src={item.movie.poster_url}
            alt={item.movie.slug}
            fill
            className="object-contain"
            sizes="(max-width: 1000px) 50vw, 100vw"
            fallbackSrc={item.movie.thumb_url}
          />
        </AspectRatio>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-8">
        <h1 className="text-3xl">{item.movie.name}</h1>
        <h3 className="text-xl text-slate-400">{item.movie.origin_name}</h3>
        <p className="mt-2">
          Thể loại:{" "}
          <span className="text-slate-200">
            {item.movie.category.map((val: any) => val.name).join(", ")}
          </span>
        </p>
        <p className="mt-2">
          Quốc gia:{" "}
          <span className="text-slate-200">
            {item.movie.country.map((val: any) => val.name).join(", ")}
          </span>
        </p>
        <p className="mt-2">
          Đạo diễn:{" "}
          <span className="text-slate-200">{item.movie.director}</span>
        </p>
        <p className="mt-2">
          Diễn viên:{" "}
          <span className="text-slate-200">{item.movie.actor.join(", ")}</span>
        </p>
        <p className="mt-2">
          Thời lượng: <span className="text-slate-200">{item.movie.time}</span>
        </p>
        <p className="mt-2">
          Số tập:{" "}
          <span className="text-slate-200">{item.movie.episode_total}</span>
        </p>
        {hasLinks && hasEpisode && (
          <div className="mt-2 space-x-2">
            <Button size="lg" variant="secondary">
              Tải về
            </Button>
            <Link
              href={`/xem-phim/${item.movie.slug}`}
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
