"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

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
        <div className="search flex-1 flex h-full">
          <div className="self-center flex-1 bg-white rounded-md flex items-center pr-3 border-input border">
            <Input
              className="text-muted-foreground border-none"
              placeholder="Tìm kiếm phim tại đây..."
            />
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
