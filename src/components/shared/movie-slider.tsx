"use client";

import Link from "next/link";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieSlider() {
  const { data, isLoading } = useQuery({
    queryKey: ["phim-moi-cap-nhat"],
    queryFn: async () => {
      const response = await fetch(
        "https://phimapi.com/danh-sach/phim-moi-cap-nhat"
      );
      return await response.json();
    },
    staleTime: 1000 * 60 * 5000, // 5000 minutes
  });

  useEffect(() => {
    new Swiper(".swiper", {
      modules: [Navigation, Autoplay],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      spaceBetween: 12,
      slidesPerView: 1,
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      },
      autoplay: {
        delay: 4567,
      },
    });
  }, []);

  return (
    <div className="swiper text-muted group !m-3">
      <div className="swiper-wrapper">
        {isLoading
          ? new Array(5).fill("").map((_, index) => {
              return (
                <div key={index} className="swiper-slide relative">
                  <AspectRatio ratio={16 / 9}>
                    <Skeleton className="h-full w-full" />
                  </AspectRatio>
                  <Skeleton className="h-6 mt-2" />
                </div>
              );
            })
          : data?.items.map((item: any) => {
              return (
                <Link
                  href={`/phim/${item.slug}`}
                  key={item._id}
                  className="swiper-slide relative"
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={item.thumb_url}
                      alt={item.slug}
                      fill
                      className="rounded-md"
                      sizes="(max-width:1000px) 50vw, 100vw"
                      priority={true}
                    />
                  </AspectRatio>
                  <h5 className="text-white mt-2">{item.name}</h5>
                </Link>
              );
            })}
      </div>
      <div className="swiper-pagination"></div>

      <div className="swiper-button-prev z-10 !hidden group-hover:!block"></div>
      <div className="swiper-button-next z-10 !hidden group-hover:!block"></div>
    </div>
  );
  // return (
  //   <div className="grid grid-cols-10 gap-4 p-4">
  //     {movies.map((item: any) => {
  //       return (
  //         <Link
  //           href={`/phim/${item.slug}`}
  //           key={item._id}
  //           className="col-span-2 relative"
  //         >
  //           <AspectRatio ratio={16 / 9}>
  //             <Image
  //               src={item.thumb_url}
  //               alt={item.slug}
  //               fill
  //               className="rounded-md"
  //             />
  //           </AspectRatio>
  //           <h5 className="text-white">{item.name}</h5>
  //         </Link>
  //       );
  //     })}
  //   </div>
  // );
}
