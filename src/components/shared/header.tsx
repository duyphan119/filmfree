"use client";

import { filmTypesList } from "@/lib/constants";
import Link from "next/link";
import { Suspense } from "react";
import FormSearch from "./form-search";
import NavMenu from "./nav-menu";
import { Category } from "@/lib/category";
import { Country } from "@/lib/country";

type HeaderProps = {
  categories: Category[];
  countries: Country[];
};

export default function Header({ categories, countries }: HeaderProps) {
  return (
    <header className="bg-black relative">
      <div className="custom-container md:h-16 h-32 flex flex-wrap gap-x-4 md:gap-y-8 md:gap-x-8 text-muted">
        <div className="logo h-16 md:h-full order-1">
          <Link href="/" className="h-16 md:h-full flex items-center text-xl">
            FILMFREE
          </Link>
        </div>
        <div className="h-16 md:h-full flex md:justify-start justify-center gap-4 md:order-2 order-3 w-full md:w-auto">
          <Suspense>
            <NavMenu title="Loại" items={filmTypesList} type="danh-sach" />
            {categories && (
              <NavMenu title="Thể loại" items={categories} type="the-loai" />
            )}
            {countries && (
              <NavMenu title="Quốc gia" items={countries} type="quoc-gia" />
            )}
          </Suspense>
        </div>

        <Suspense>
          <FormSearch />
        </Suspense>
      </div>
    </header>
  );
}
