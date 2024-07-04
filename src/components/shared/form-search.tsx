"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useClickOutside from "@/hooks/useClickOutside";

export default function FormSearch({
  keyword: defaultKeyword,
}: {
  keyword: string;
}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [keyword, setKeyword] = useState<string>(defaultKeyword);

  const divRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(divRef, () => {
    setVisible(false);
  });

  const router = useRouter();

  const pathnameViewAll = `/tim-kiem?keyword=${keyword}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVisible(false);
    router.push(pathnameViewAll);
  };

  useEffect(() => {
    let timeoutId = setTimeout(async () => {
      if (keyword) {
        const response = await fetch(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=10`
        );

        const jsonData = await response.json();

        const items = jsonData.data.items;

        setResults(items);
        setVisible(true);
      }
    }, 456);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [keyword]);

  return (
    <div
      ref={divRef}
      className="search flex-1 flex h-16 md:h-full relative md:order-3 order-2"
    >
      <form
        onSubmit={handleSubmit}
        className="relative self-center flex-1 bg-white rounded-md flex items-center pr-3 border-input border"
      >
        <Input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm kiếm phim tại đây..."
          className="w-full text-muted-foreground border-none"
        />
        <Search className="h-4 w-4 text-muted-foreground" />
        {visible && (
          <div className="z-20 absolute top-full inset-x-0 bg-white ring-1 ring-border text-muted-foreground">
            {keyword &&
              (results.length > 0 ? (
                <>
                  <ScrollArea
                    style={{
                      height: results.length > 5 ? 84 * 5 : results.length * 84,
                    }}
                  >
                    {results.map((movie) => (
                      <Link
                        key={movie._id}
                        href={`/phim/${movie.slug}`}
                        className="p-3 hover:bg-slate-200 cursor-pointer grid grid-cols-4 gap-2"
                      >
                        <AspectRatio ratio={16 / 9} className="col-span-1">
                          <Image
                            src={`https://kkphim.com/${
                              movie.thumb_url || movie.poster_url
                            }`}
                            alt="thumbnail"
                            fill
                            sizes="(max-width:1000px) 50vw, 100vw"
                          />
                        </AspectRatio>
                        <div className="col-span-3">
                          <div className="">{movie.name}</div>
                        </div>
                      </Link>
                    ))}
                  </ScrollArea>
                  <Separator />
                  <div className="text-center">
                    <Link
                      href={pathnameViewAll}
                      className={buttonVariants({
                        variant: "link",
                      })}
                    >
                      Xem tất cả
                    </Link>
                  </div>
                </>
              ) : (
                <div className="p-3">Không tìm thấy phim phù hợp</div>
              ))}
          </div>
        )}
      </form>
    </div>
  );
}
