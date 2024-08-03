"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LatestMovie } from "@/lib/movie";
import Link from "next/link";
import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import FallbackImage from "./fallback-image";

type MovieSliderProps = {
  movies: LatestMovie[];
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
              key={item._id}
              className="swiper-slide relative"
            >
              <AspectRatio ratio={16 / 9}>
                <FallbackImage
                  src={item.thumb_url}
                  fallbackSrc={item.poster_url}
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
}
