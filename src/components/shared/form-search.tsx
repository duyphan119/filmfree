"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useClickOutside from "@/hooks/useClickOutside";
import FallbackImage from "./fallback-image";
import { Movie, searchMovies } from "@/lib/movie";

export default function FormSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsKeyword = searchParams.get("keyword");

  const [visible, setVisible] = useState<boolean>(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [cdnImageDomain, setCdnImageDomain] = useState<string>("");

  const divRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(divRef, () => {
    setVisible(false);
  });

  const router = useRouter();

  const pathnameViewAll = `/tim-kiem?keyword=${keyword}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(pathnameViewAll);
  };

  useEffect(() => {
    setKeyword("");
    setVisible(false);
    setResults([]);
  }, [pathname, searchParamsKeyword]);

  useEffect(() => {
    let timeoutId = setTimeout(async () => {
      if (keyword) {
        const { movies, cdnImageDomain } = await searchMovies({
          keyword,
        });
        setCdnImageDomain(cdnImageDomain);
        setResults(movies);
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
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onFocus={() => setVisible(true)}
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
                        {cdnImageDomain && (
                          <AspectRatio ratio={16 / 9} className="col-span-1">
                            <FallbackImage
                              src={`${cdnImageDomain}/${movie.thumb_url}`}
                              fallbackSrc={`${cdnImageDomain}/${movie.poster_url}`}
                              alt="thumbnail"
                              fill
                              sizes="(max-width:1000px) 50vw, 100vw"
                            />
                          </AspectRatio>
                        )}
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
