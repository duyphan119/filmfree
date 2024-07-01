import MovieSlider from "@/components/shared/movie-slider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const [
    latestResponse,
    dramaResponse,
    movieResponse,
    cartoonResponse,
    tvShowsResponse,
  ] = await Promise.all([
    fetch("https://phimapi.com/danh-sach/phim-moi-cap-nhat?limit=4"),
    fetch("https://phimapi.com/v1/api/danh-sach/phim-bo?limit=8"),
    fetch("https://phimapi.com/v1/api/danh-sach/phim-le?limit=8"),
    fetch("https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=8"),
    fetch("https://phimapi.com/v1/api/danh-sach/tv-shows?limit=8"),
  ]);
  const [
    latestJsonData,
    dramaJsonData,
    movieJsonData,
    cartoonJsonData,
    tvShowsJsonData,
  ] = await Promise.all([
    latestResponse.json(),
    dramaResponse.json(),
    movieResponse.json(),
    cartoonResponse.json(),
    tvShowsResponse.json(),
  ]);

  return (
    <>
      <Header href="/danh-sach-phim">Phim mới cập nhật</Header>
      <MovieSlider movies={latestJsonData.items} />
      <Header href="/danh-sach-phim/phim-bo">Phim bộ</Header>
      <Items items={dramaJsonData.data.items} />
      <Header href="/danh-sach-phim/phim-le">Phim lẻ</Header>
      <Items items={movieJsonData.data.items} />
      <Header href="/danh-sach-phim/hoat-hinh">Hoạt hình</Header>
      <Items items={cartoonJsonData.data.items} />
      <Header href="/danh-sach-phim/tv-shows">TV shows</Header>
      <Items items={tvShowsJsonData.data.items} />
    </>
  );
}

function Header({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div className="uppercase p-3 text-muted">
      <Link href={href}>{children}</Link>
    </div>
  );
}

function Items({ items }: { items: any }) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {items.map((item: any) => {
        return (
          <Link
            href={`/phim/${item.slug}`}
            key={item._id}
            className="col-span-3 relative space-y-2"
          >
            <AspectRatio ratio={16 / 9}>
              <Image
                src={`https://kkphim.com/${item.thumb_url}`}
                alt={item.slug}
                fill
                className="rounded-md"
              />
            </AspectRatio>
            <h5 className="text-white">{item.name}</h5>
          </Link>
        );
      })}
    </div>
  );
}
