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

type TableMovieProps = {
  data: Array<
    Movie & {
      movieActors: Array<
        MovieActor & {
          actor: Actor;
        }
      >;
      movieCategories: Array<
        MovieCategory & {
          category: Category;
        }
      >;
      movieCountries: Array<
        MovieCountry & {
          country: Country;
        }
      >;
      movieDirectors: Array<
        MovieDirector & {
          director: Director;
        }
      >;
    }
  >;
  className?: string;
};

const TableMovie = ({ data, className }: TableMovieProps) => {
  return (
    <Table className={className}>
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
        {data.length > 0 ? (
          data.map((row) => (
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
                  .map((item) => item.category.name)
                  .join(", ")}
              </TableCell>
              <TableCell className="text-slate-50">
                {row.movieCountries.map((item) => item.country.name).join(", ")}
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
  );
};

export default TableMovie;
