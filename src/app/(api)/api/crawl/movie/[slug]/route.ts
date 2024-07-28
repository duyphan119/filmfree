import { filmTypesList } from "@/lib/constants";
import { crawlData } from "@/lib/crawl-data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const searchParams = request.nextUrl.searchParams;
  const typeSlug =
    filmTypesList.find((item) => item.slug === searchParams.get("type"))
      ?.slug || "phim-bo";
  crawlData(params.slug, typeSlug);
  return NextResponse.json({
    params,
  });
};
