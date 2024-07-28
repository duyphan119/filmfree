"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import FormSearch from "./form-search";
import { cn } from "@/lib/utils";
import { filmTypesList } from "@/lib/constants";
import { Suspense } from "react";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-black">
      <div className="max-w-5xl mx-auto lg:px-10 md:px-8 sm:px-6 px-4 md:h-16 h-32 flex flex-wrap gap-x-4 md:gap-y-8 md:gap-x-8 text-muted">
        <div className="logo h-16 md:h-full order-1">
          <Link href="/" className="h-16 md:h-full flex items-center text-xl">
            FILMFREE
          </Link>
        </div>
        <div className="categories h-16 md:h-full flex md:justify-start justify-center gap-4 md:order-2 order-3 w-full md:w-auto">
          {filmTypesList.map((category) => (
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

        <Suspense>
          <FormSearch />
        </Suspense>
      </div>
    </header>
  );
}
