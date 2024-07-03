"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import FormSearch from "./form-search";
import { cn } from "@/lib/utils";

export const categories = [
  {
    name: "Phim bộ",
    href: "/danh-sach-phim/phim-bo",
    slug: "phim-bo",
  },
  {
    name: "Phim lẻ",
    href: "/danh-sach-phim/phim-le",
    slug: "phim-le",
  },
  {
    name: "Hoạt hình",
    href: "/danh-sach-phim/hoat-hinh",
    slug: "hoat-hinh",
  },
  {
    name: "TV Shows",
    href: "/danh-sach-phim/tv-shows",
    slug: "tv-shows",
  },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-black">
      <div className="max-w-5xl mx-auto px-10 h-16 flex gap-8 text-muted">
        <div className="logo h-full">
          <Link href="/" className="h-full flex items-center text-xl">
            FILMFREE
          </Link>
        </div>
        <div className="categories h-full flex gap-4">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className={cn(
                "h-full flex items-center hover:text-blue-400",
                pathname.includes(category.href) && "text-blue-400"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <FormSearch keyword="" />
      </div>
    </header>
  );
}
