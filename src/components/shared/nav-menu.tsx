"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavMenuProps = {
  items: ({ name: string; href: string } & any)[];
  title: string;
  className?: string;
  type: "the-loai" | "quoc-gia" | "danh-sach";
};

const NavMenu = ({ items, title, className, type }: NavMenuProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsType = searchParams.get("type");
  const searchParamsValue = searchParams.get("value");

  const divRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useClickOutside(divRef, () => {
    setVisible(false);
  });

  useEffect(() => {
    setVisible(false);
  }, [pathname, searchParamsType, searchParamsValue]);

  if (items.length === 0) return null;
  return (
    <div
      ref={divRef}
      className={cn("static h-full flex items-center", className)}
    >
      <div
        onClick={() => setVisible((prevState) => !prevState)}
        className="flex h-full cursor-pointer items-center gap-1 hover:text-blue-400"
      >
        {title} <ChevronDown className="w-4 h-4" />
      </div>
      {visible && (
        <div className="absolute top-full inset-x-0 z-10 bg-neutral-800">
          <div className="custom-container flex flex-wrap items-center gap-x-4">
            {items.map((item) => (
              <Link
                key={item.name}
                href={`/danh-sach-phim?type=${type}&value=${item.slug}`}
                className="block py-3 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 text-muted hover:text-blue-500 hover:underline hover:underline-offset-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMenu;
