import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || "";
  const limit = Number(searchParams.get("limit") || "12");
  const page = Number(searchParams.get("page") || "1");

  try {
    const where: any = {
      OR: [
        {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          originName: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ],
    };
    const movies = await prisma.movie.findMany({
      where,
      orderBy: {
        updatedAt: "desc",
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    const count = await prisma.movie.count({
      where,
    });

    return NextResponse.json({
      items: movies,
      totalPages: Math.ceil(count / limit),
      count,
    });
  } catch (error) {
    return NextResponse.json({
      items: [],
      totalPages: 0,
      count: 0,
    });
  }
};
