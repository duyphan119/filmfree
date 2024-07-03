"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

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

export default function Footer() {
  return (
    <div className="bg-slate-900 text-muted">
      <div className="max-w-5xl mx-auto px-10">
        <div className="flex justify-between items-center h-24">
          <div>
            <h1 className="text-2xl font-bold">FILMFREE</h1>
            <p className="mt-2">© 2024 FILMFREE. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="h-full flex items-center hover:underline hover:underline-offset-2"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
