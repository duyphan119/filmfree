"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import FormSearch from "./form-search";

const categories = [
  {
    name: "Phim bộ",
    href: "/danh-sach-phim/phim-bo",
  },
  {
    name: "Phim lẻ",
    href: "/danh-sach-phim/phim-le",
  },
  {
    name: "Hoạt hình",
    href: "/danh-sach-phim/hoat-hinh",
  },
  {
    name: "TV Shows",
    href: "/danh-sach-phim/tv-shows",
  },
];

export default function Header() {
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
              className="h-full flex items-center"
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
