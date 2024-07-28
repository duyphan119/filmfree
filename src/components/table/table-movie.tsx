"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Actor,
  Category,
  Country,
  Director,
  Movie,
  MovieActor,
  MovieCategory,
  MovieCountry,
  MovieDirector,
} from "@prisma/client";
import { Trash2 } from "lucide-react";
import FallbackImage from "../shared/fallback-image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteMovie } from "@/lib/actions";

type TableMovieProps = {
  movies: Array<
    Movie & {
      movieActors: Array<
        MovieActor & {
          actor: Actor | null;
        }
      >;
      movieCategories: Array<
        MovieCategory & {
          category: Category | null;
        }
      >;
      movieCountries: Array<
        MovieCountry & {
          country: Country | null;
        }
      >;
      movieDirectors: Array<
        MovieDirector & {
          director: Director | null;
        }
      >;
    }
  >;
  url: string;
};

const TableMovie = ({ movies, url }: TableMovieProps) => {
  const router = useRouter();

  const handleClickDelete = (id: string) => {
    router.refresh();
  };
  return (
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
            <TableRow
              key={row.id}
              onClick={() => {
                router.push(`/phim/${row.slug}`);
              }}
              className="cursor-pointer transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
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
                <form
                  action={async () => {
                    deleteMovie(row.id, url);
                  }}
                >
                  <Button
                    type="submit"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleClickDelete(row.id)}
                  >
                    <Trash2 />
                  </Button>
                </form>
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
  );
};

export default TableMovie;
