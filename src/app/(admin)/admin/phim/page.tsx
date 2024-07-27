import FallbackImage from "@/components/shared/fallback-image";
import ButtonCrawlData from "@/components/table/button-crawl-data";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/client";
import { Trash2 } from "lucide-react";

const AdminMovieListPage = async () => {
  // await prisma.episode.deleteMany();
  // await prisma.movie.deleteMany();
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
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="actions">
        <ButtonCrawlData model="movie" />
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="text-slate-50">Ảnh bìa</TableHead>
            <TableHead className="text-slate-50">Ảnh đại diện</TableHead>
            <TableHead className="text-slate-50">Tên phim</TableHead>
            <TableHead className="text-slate-50">Loại</TableHead>
            <TableHead className="text-slate-50">Thể loại</TableHead>
            <TableHead className="text-slate-50">Quốc gia</TableHead>
            <TableHead className="text-slate-50"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.length > 0 ? (
            movies.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="text-slate-50 w-56">
                  <AspectRatio ratio={16 / 9}>
                    <FallbackImage
                      src={row.posterUrl}
                      alt={row.slug}
                      fill
                      className="rounded-md object-cover"
                      sizes="(max-width:1000px) 50vw, 100vw"
                      priority={true}
                      fallbackSrc={row.thumbnailUrl}
                    />
                  </AspectRatio>
                </TableCell>
                <TableCell className="text-slate-50 w-32">
                  <AspectRatio ratio={3 / 4}>
                    <FallbackImage
                      src={row.thumbnailUrl}
                      alt={row.slug}
                      fill
                      className="rounded-md object-cover"
                      sizes="(max-width:1000px) 50vw, 100vw"
                      priority={true}
                      fallbackSrc={row.posterUrl}
                    />
                  </AspectRatio>
                </TableCell>
                <TableCell className="text-slate-50">{row.name}</TableCell>
                <TableCell className="text-slate-50">{row.type}</TableCell>
                <TableCell className="text-slate-50">
                  {row.movieCategories
                    .map((item) => item.category?.name || "")
                    .join(", ")}
                </TableCell>
                <TableCell className="text-slate-50">
                  {row.movieCountries
                    .map((item) => item.country?.name || "")
                    .join(", ")}
                </TableCell>
                <TableCell className="text-slate-50">
                  <Button variant="destructive" size="icon">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-slate-50">
                Chưa có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminMovieListPage;
