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
import { Movie } from "@prisma/client";

type MovieSliderProps = {
  movies: Movie[];
};

export default function MovieSlider({ movies }: MovieSliderProps) {
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
        {movies.map((item) => {
          return (
            <Link
              href={`/phim/${item.slug}`}
              key={item.id}
              className="swiper-slide relative"
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={item.thumbnailUrl}
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
