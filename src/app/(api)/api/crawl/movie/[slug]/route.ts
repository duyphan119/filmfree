import prisma from "@/lib/client";
import { filmTypesList } from "@/lib/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const searchParams = request.nextUrl.searchParams;
  const typeName =
    filmTypesList.find((item) => item.slug === searchParams.get("type"))
      ?.name || "Phim bộ";

  const slug = params.slug;
  try {
    const { data }: any = await axios.get(`https://phimapi.com/phim/${slug}`);

    let movie = await prisma.movie.findFirst({
      where: { slug },
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
    });
    if (movie && ["Hoàn Tất", "Full"].includes(data.movie.episode_current)) {
      return NextResponse.json({
        message: "Hết phim rồi",
      });
    } else if (!movie) {
      const actors = await Promise.all(
        data.movie.actor.map((name: string) =>
          prisma.actor.upsert({
            create: { name },
            update: { name },
            where: { name },
          })
        )
      );
      const directors = await Promise.all(
        data.movie.director.map((name: string) =>
          prisma.director.upsert({
            create: { name },
            update: { name },
            where: { name },
          })
        )
      );
      const categories = await Promise.all(
        data.movie.category.map(({ name, slug }: any) =>
          prisma.category.upsert({
            create: { name, slug },
            update: { name },
            where: { slug },
          })
        )
      );
      const countries = await Promise.all(
        data.movie.country.map(({ name, slug }: any) =>
          prisma.country.upsert({
            create: { name, slug },
            update: { name },
            where: { slug },
          })
        )
      );
      const servers = await Promise.all(
        data.episodes.map((episode: any) =>
          prisma.server.upsert({
            create: { name: episode.server_name },
            update: {},
            where: { name: episode.server_name },
          })
        )
      );
      movie = (await prisma.movie.create({
        data: {
          name: data.movie.name,
          slug: data.movie.slug,
          type: typeName,
          description: data.movie.content,
          episodeCurrent: data.movie.episode_current,
          thumbnailUrl: data.movie.thumb_url,
          posterUrl: data.movie.poster_url,
          year: data.movie.year,
          quality: data.movie.quality,
          language: data.movie.lang,
          originName: data.movie.origin_name,
          createdAt: new Date(data.movie.created.time),
          updatedAt: new Date(data.movie.modified.time),
          trailerUrl: data.movie.trailer_url,
          episodeTotal: +data.movie.episode_total,
          view: data.movie.view,
          time: data.movie.time,
        },
      })) as any;

      if (movie) {
        await Promise.all(
          data.episodes.map((episode: any, index: number) =>
            prisma.server.update({
              where: { id: servers[index].id },
              data: {
                episodes: {
                  createMany: {
                    data: episode.server_data.map((item: any) => ({
                      name: item.name,
                      slug: item.slug,
                      linkM3u8: item.link_m3u8,
                      linkEmbed: item.link_embed,
                      filename: item.filename,
                      movieId: (movie as any).id,
                    })),
                  },
                },
              },
            })
          )
        );
        await prisma.movie.update({
          where: { id: movie.id },
          data: {
            movieCategories: {
              createMany: {
                data: categories.map((category) => ({
                  categoryId: category.id,
                })),
              },
            },
            movieActors: {
              createMany: {
                data: actors.map((actor) => ({
                  actorId: actor.id,
                })),
              },
            },
            movieDirectors: {
              createMany: {
                data: directors.map((director) => ({
                  directorId: director.id,
                })),
              },
            },
            movieCountries: {
              createMany: {
                data: countries.map((country) => ({
                  countryId: country.id,
                })),
              },
            },
            movieServers: {
              createMany: {
                data: servers.map((server) => ({
                  serverId: server.id,
                })),
              },
            },
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({
    params,
  });
};
