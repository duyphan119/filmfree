"use client";

import { filmTypesList } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-muted">
      <div className="max-w-5xl mx-auto lg:px-10 md:px-8 sm:px-6 px-4">
        <div className="flex md:justify-between md:items-center items-start flex-1 md:flex-row flex-col gap-4 py-4">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl font-bold">FILMFREE</h1>
            <p className="mt-2">© 2024 FILMFREE. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            {filmTypesList.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="justify-start hover:underline hover:underline-offset-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
