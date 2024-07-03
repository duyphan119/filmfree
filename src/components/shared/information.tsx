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
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 lg:col-span-4 relative">
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
      <div className="col-span-12 lg:col-span-8">
        <h1 className="text-3xl">{item.name}</h1>
        <h3 className="text-xl text-slate-400">{item.origin_name}</h3>
        <p className="mt-2">
          Thể loại:{" "}
          <span className="text-slate-200">
            {item.category.map((val: any) => val.name).join(", ")}
          </span>
        </p>
        <p className="mt-2">
          Quốc gia:{" "}
          <span className="text-slate-200">
            {item.country.map((val: any) => val.name).join(", ")}
          </span>
        </p>
        <p className="mt-2">
          Đạo diễn: <span className="text-slate-200">{item.director}</span>
        </p>
        <p className="mt-2">
          Diễn viên:{" "}
          <span className="text-slate-200">{item.actor.join(", ")}</span>
        </p>
        <p className="mt-2">
          Thời lượng: <span className="text-slate-200">{item.time}</span>
        </p>
        <p className="mt-2">
          Số tập: <span className="text-slate-200">{item.episode_total}</span>
        </p>
        {hasLinks && (
          <div className="mt-2 space-x-2">
            <Button size="lg" variant="secondary">
              Tải về
            </Button>
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
