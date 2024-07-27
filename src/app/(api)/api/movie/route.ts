import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const typeName = searchParams.get("type") || "Phim bộ";

  try {
    let movies = await prisma.movie.findMany({
      include: {
        movieActors: {
          include: {
            actor: true,
          },
        },
        movieCategories: {
          include: {
            category: true,
          },
        },
        movieCountries: {
          include: {
            country: true,
          },
        },
        movieDirectors: {
          include: {
            director: true,
          },
        },
      },
      take: 12,
    });

    return NextResponse.json({
      rows: movies,
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({
    rows: [],
  });
};
