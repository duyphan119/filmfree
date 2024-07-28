import Information from "@/components/shared/information";
import prisma from "@/lib/client";
import { MessageSquareWarning } from "lucide-react";
import { Metadata } from "next";

type AdminEditMoviePageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params,
}: AdminEditMoviePageProps): Promise<Metadata> => {
  try {
    const movie = await prisma.movie.findFirst({ where: { id: params.id } });

    if (movie) {
      return {
        title: `FILMFREE | Sửa phim ${movie.name}`,
        description: movie.description,
      };
    }
  } catch (error) {}

  return {
    title: `FILMFREE | Sửa phim`,
  };
};

const AdminEditMoviePage = async ({ params }: AdminEditMoviePageProps) => {
  try {
    const movie = await prisma.movie.findFirst({
      where: { id: params.id },
    });
    if (movie) {
      return <div>abc</div>;
    }
  } catch (error) {}
  return (
    <div className="bg-destructive text-destructive-foreground p-4 flex gap-1">
      <MessageSquareWarning />
      <span>Có lỗi xảy ra, vui lòng thử lại sau!</span>
    </div>
  );
};

export default AdminEditMoviePage;
